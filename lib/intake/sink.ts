import { createHmac } from "node:crypto";
import type { TrackingRow } from "./tracking";

/** One stored inquiry — matches public.injury_payout_leads (supabase/migrations). */
export type LeadRow = {
  enquiry_id: string;
  idempotency_key: string;
  preferred_language: string;
  category: string;
  zip: string;
  street_address: string | null;
  city: string | null;
  state: string | null;
  incident_date_unknown: boolean;
  incident_month: number | null;
  incident_year: number | null;
  description: string | null;
  first_name: string;
  last_name: string;
  phone_e164: string;
  email: string;
  consent: boolean;
  consent_version: string;
  consent_text: string;
};

/** Which store is configured: Supabase first, then the signed webhook. */
export function sinkConfigured(): "supabase" | "webhook" | null {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY) return "supabase";
  if (process.env.INTAKE_WEBHOOK_URL) return "webhook";
  return null;
}

async function supabaseInsert(table: string, row: object, query: string, prefer: string) {
  const base = process.env.SUPABASE_URL!.replace(/\/$/, "");
  const key = process.env.SUPABASE_SECRET_KEY!;
  const res = await fetch(`${base}/rest/v1/${table}${query}`, {
    method: "POST",
    headers: { "content-type": "application/json", apikey: key, authorization: `Bearer ${key}`, prefer },
    body: JSON.stringify(row),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`${table}: supabase ${res.status} ${(await res.text()).slice(0, 300)}`);
  return res;
}

/**
 * Store the lead, then its tracking row (linked by lead_id). Resolves once the
 * lead itself is stored; throws if it is not. A repeat of the same
 * idempotency key adds nothing. A tracking failure is logged but never loses
 * the lead.
 */
export async function storeLead(lead: LeadRow, tracking: TrackingRow): Promise<void> {
  const sink = sinkConfigured();
  if (sink === "supabase") {
    const res = await supabaseInsert(
      "injury_payout_leads",
      lead,
      "?on_conflict=idempotency_key&select=id",
      "resolution=ignore-duplicates,return=representation",
    );
    const inserted = (await res.json()) as { id: string }[];
    if (inserted.length === 0) return; // duplicate submission: already stored
    try {
      await supabaseInsert(
        "injury_payout_lead_tracking",
        { lead_id: inserted[0].id, enquiry_id: lead.enquiry_id, ...tracking },
        "",
        "return=minimal",
      );
    } catch (error) {
      console.error(JSON.stringify({ event: "tracking_store_failed", enquiryId: lead.enquiry_id, reason: (error as Error).message }));
    }
    return;
  }
  if (sink === "webhook") {
    const body = JSON.stringify({ lead, tracking });
    const signature = createHmac("sha256", process.env.INTAKE_WEBHOOK_SECRET ?? "").update(body).digest("hex");
    const res = await fetch(process.env.INTAKE_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "idempotency-key": lead.idempotency_key,
        "x-injurypayout-signature": `sha256=${signature}`,
      },
      body,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
    return;
  }
  throw new Error("no sink configured");
}
