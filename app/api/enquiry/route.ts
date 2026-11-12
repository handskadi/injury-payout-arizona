import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { isCategoryId } from "@/content/categories";
import { evaluatorRules } from "@/content/rules";
import { intakeMode } from "@/content/site";
import { getDictionary } from "@/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { storeLead, sinkConfigured, type LeadRow } from "@/lib/intake/sink";
import { buildTrackingRow } from "@/lib/intake/tracking";
import { toE164 } from "@/lib/evaluator/phone";
import { toIncidentDate, validateAll } from "@/lib/evaluator/validate";
import { emptyValues, type Values } from "@/lib/evaluator/types";

/**
 * Live intake endpoint. Absent in demo mode. In live mode it validates and
 * normalises again, then stores the lead in Supabase (injury_payout_leads +
 * injury_payout_lead_tracking, server-side secret key) — or, if Supabase is
 * not configured, sends it to INTAKE_WEBHOOK_URL (HMAC-signed). Success is
 * returned only after the store confirms.
 *
 * Idempotency and rate limits below are per-instance memory: on serverless,
 * the sink must also dedupe on `idempotency_key` (sent with every record).
 * Logs carry the enquiry ID only — never names, contact details or narratives.
 */

type Outcome = { status: number; body: Record<string, unknown> };

const IDEMPOTENCY_TTL_MS = 24 * 60 * 60 * 1000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 6;
const MIN_FILL_MS = 4000;

const completed = new Map<string, { at: number; outcome: Outcome }>();
const inflight = new Map<string, Promise<Outcome>>();
const hits = new Map<string, number[]>();

const json = ({ status, body }: Outcome) => NextResponse.json(body, { status, headers: { "cache-control": "no-store" } });

export async function POST(request: Request) {
  if (intakeMode !== "live") return json({ status: 404, body: { error: "not_found" } });

  const key = request.headers.get("idempotency-key") ?? "";
  if (!/^[\w-]{8,100}$/.test(key)) return json({ status: 400, body: { error: "idempotency_key_required" } });

  const now = Date.now();
  for (const [k, v] of completed) if (now - v.at > IDEMPOTENCY_TTL_MS) completed.delete(k);
  const done = completed.get(key);
  if (done) return json(done.outcome);
  const pending = inflight.get(key);
  if (pending) return json(await pending);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip, now)) return json({ status: 429, body: { error: "rate_limited" } });

  const work = handle(request, key);
  inflight.set(key, work);
  try {
    const outcome = await work;
    // Cache final answers; let transient failures be retried with the same key.
    if (outcome.status < 500) completed.set(key, { at: Date.now(), outcome });
    return json(outcome);
  } finally {
    inflight.delete(key);
  }
}

async function handle(request: Request, key: string): Promise<Outcome> {
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return { status: 400, body: { error: "invalid_json" } };
  }

  const values = coerceValues(payload.values);
  const language = typeof payload.language === "string" && hasLocale(payload.language) ? payload.language : "en";
  const errors = validateAll(values, new Date(), true);
  if (Object.keys(errors).length > 0) return { status: 422, body: { errors } };

  const enquiryId = `IP-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${randomBytes(4).toString("hex").toUpperCase()}`;

  // Bot mitigation: honeypot or an impossibly fast completion. Answer like a
  // success so automated senders learn nothing, but store nothing.
  const startedAt = typeof payload.startedAt === "number" ? payload.startedAt : 0;
  if (values.website || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    console.info(JSON.stringify({ event: "enquiry_discarded_bot", enquiryId }));
    return { status: 200, body: { enquiryId } };
  }

  // No live submissions without the firm-approved consent wording (brief p.15, p.19).
  const consentVersion = evaluatorRules.consentVersion;
  if (!consentVersion) {
    console.error(JSON.stringify({ event: "enquiry_consent_missing", enquiryId }));
    return { status: 503, body: { error: "intake_unavailable" } };
  }

  if (!sinkConfigured()) {
    console.error(JSON.stringify({ event: "enquiry_sink_missing", enquiryId }));
    return { status: 503, body: { error: "intake_unavailable" } };
  }

  const incident = toIncidentDate(values);
  const step3 = getDictionary(language).evaluator.step3;
  const lead: LeadRow = {
    enquiry_id: enquiryId,
    idempotency_key: key,
    preferred_language: language,
    category: values.category!,
    zip: values.zip.trim().slice(0, 5),
    street_address: tidy(values.streetAddress) || null,
    city: tidy(values.city) || null,
    state: tidy(values.state) || null,
    incident_date_unknown: incident.kind === "unknown",
    incident_month: incident.kind === "approximate" ? incident.month : null,
    incident_year: incident.kind === "approximate" ? incident.year : null,
    description: values.description.trim() || null,
    first_name: tidy(values.firstName),
    last_name: tidy(values.lastName),
    phone_e164: toE164(values.phone) ?? values.phone.trim(),
    email: values.email.trim().toLowerCase(),
    // Consent evidence: the box was checked, which wording (version + exact text in the visitor's language).
    consent: values.consent,
    consent_version: consentVersion,
    consent_text: `${step3.noticeBefore}${step3.noticeLink}${step3.noticeAfter}`,
  };
  const tracking = buildTrackingRow(payload.tracking, request, startedAt, new Date());

  try {
    await storeLead(lead, tracking);
  } catch (error) {
    console.error(JSON.stringify({ event: "enquiry_sink_failed", enquiryId, reason: (error as Error).message }));
    return { status: 502, body: { error: "intake_failed" } };
  }

  console.info(JSON.stringify({ event: "enquiry_stored", enquiryId, language, category: values.category }));
  return { status: 200, body: { enquiryId } };
}

function coerceValues(input: unknown): Values {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const str = (k: string, max: number) => (typeof raw[k] === "string" ? (raw[k] as string).slice(0, max) : "");
  return {
    ...emptyValues,
    category: isCategoryId(raw.category) ? raw.category : null,
    zip: str("zip", 10),
    streetAddress: str("streetAddress", 120),
    city: str("city", 60),
    state: str("state", 40),
    addressManual: raw.addressManual === true,
    month: str("month", 2),
    year: str("year", 4),
    dateUnknown: raw.dateUnknown === true,
    // Over-long descriptions are rejected by validation, not silently cut.
    description: str("description", evaluatorRules.descriptionMaxLength + 1),
    firstName: str("firstName", evaluatorRules.nameMaxLength),
    lastName: str("lastName", evaluatorRules.nameMaxLength),
    phone: str("phone", 25),
    email: str("email", evaluatorRules.emailMaxLength + 1),
    consent: raw.consent === true,
    website: str("website", 200),
  };
}

const tidy = (s: string) => s.trim().replace(/\s+/g, " ");

function rateLimited(ip: string, now: number): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
}
