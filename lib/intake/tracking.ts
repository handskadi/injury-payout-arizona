import { TRACKED_PARAMS } from "@/lib/tracking-params";
import { parseUserAgent } from "./ua";

/**
 * Builds the injury_payout_lead_tracking row from the browser's tracking
 * payload (untrusted: every field is type-checked and length-capped) plus what
 * the server sees on the request (IP, Vercel geo headers, user agent).
 */
type Obj = Record<string, unknown>;
const obj = (v: unknown): Obj => (v && typeof v === "object" && !Array.isArray(v) ? (v as Obj) : {});
const str = (v: unknown, max = 500): string | null => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null);
const int = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? Math.round(v) : null);
const num = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? v : null);
const bool = (v: unknown): boolean | null => (typeof v === "boolean" ? v : null);
const iso = (v: unknown): string | null => {
  const s = str(v, 40);
  return s && !Number.isNaN(Date.parse(s)) ? new Date(s).toISOString() : null;
};

function params(v: unknown): Record<string, string> | null {
  const out: Record<string, string> = {};
  for (const [k, val] of Object.entries(obj(v)).slice(0, 60)) {
    if (/^[\w.-]{1,60}$/.test(k) && typeof val === "string") out[k.toLowerCase()] = val.slice(0, 500);
  }
  return Object.keys(out).length ? out : null;
}

function host(url: string | null): string | null {
  try {
    return url ? new URL(url).host : null;
  } catch {
    return null;
  }
}

function path(url: string | null): string | null {
  try {
    return url ? new URL(url).pathname : null;
  } catch {
    return null;
  }
}

const header = (h: Headers, name: string, max = 200) => {
  const v = h.get(name);
  if (!v) return null;
  try {
    return decodeURIComponent(v).slice(0, max);
  } catch {
    return v.slice(0, max);
  }
};

export function buildTrackingRow(input: unknown, request: Request, startedAt: number | null, submittedAt: Date) {
  const t = obj(input);
  const b = obj(t.browser);
  const last = obj(t.last_touch);
  const firstTouch = obj(t.first_touch);
  const lastParams = params(last.params) ?? {};
  const firstParams = params(firstTouch.params) ?? {};
  const h = request.headers;

  const userAgent = str(b.user_agent, 1000) ?? header(h, "user-agent", 1000);
  const ua = parseUserAgent(userAgent ?? "");
  const landingUrl = str(last.landing_url, 2000);
  const referrerUrl = str(last.referrer_url, 1000);
  const languages = Array.isArray(b.languages)
    ? b.languages.filter((l): l is string => typeof l === "string").slice(0, 10).map((l) => l.slice(0, 20)).join(", ")
    : null;

  const campaign: Record<string, string | null> = {};
  for (const key of TRACKED_PARAMS) campaign[key] = str(lastParams[key]);

  return {
    device_id: str(t.device_id, 100),
    session_id: str(t.session_id, 100),
    session_started_at: iso(t.session_started_at),
    form_started_at: startedAt ? new Date(startedAt).toISOString() : null,
    form_duration_seconds: startedAt ? Math.max(0, Math.round((submittedAt.getTime() - startedAt) / 1000)) : null,

    ip_address: (h.get("x-real-ip") ?? h.get("x-forwarded-for")?.split(",")[0] ?? "").trim().slice(0, 64) || null,
    ip_country: header(h, "x-vercel-ip-country", 8),
    ip_region: header(h, "x-vercel-ip-country-region", 16),
    ip_city: header(h, "x-vercel-ip-city", 100),
    ip_postal_code: header(h, "x-vercel-ip-postal-code", 16),
    ip_latitude: Number(h.get("x-vercel-ip-latitude")) || null,
    ip_longitude: Number(h.get("x-vercel-ip-longitude")) || null,
    ip_timezone: header(h, "x-vercel-ip-timezone", 64),

    user_agent: userAgent,
    ...ua,
    ua_platform: str(b.ua_platform, 50),
    ua_mobile: bool(b.ua_mobile),
    ua_brands: str(b.ua_brands, 300),
    accept_language: header(h, "accept-language", 200),
    browser_language: str(b.language, 20),
    browser_languages: languages || null,
    timezone: str(b.timezone, 64),
    timezone_offset_min: int(b.timezone_offset_min),
    screen_width: int(b.screen_width),
    screen_height: int(b.screen_height),
    viewport_width: int(b.viewport_width),
    viewport_height: int(b.viewport_height),
    pixel_ratio: num(b.pixel_ratio),
    color_depth: int(b.color_depth),
    touch_points: int(b.touch_points),
    hardware_concurrency: int(b.hardware_concurrency),
    device_memory_gb: num(b.device_memory_gb),
    connection_type: str(b.connection_type, 20),
    cookies_enabled: bool(b.cookies_enabled),
    do_not_track: str(b.do_not_track, 10),

    landing_url: landingUrl,
    landing_path: path(landingUrl),
    referrer_url: referrerUrl,
    referrer_host: host(referrerUrl),
    last_touch_at: iso(last.at),
    submit_url: str(t.submit_url, 2000),
    ...campaign,
    landing_params: Object.keys(lastParams).length ? lastParams : null,

    fbc: str(t.fbc, 300),
    fbp: str(t.fbp, 100),
    ga_cookie: str(t.ga_cookie, 100),
    gcl_aw: str(t.gcl_aw, 300),
    gcl_au: str(t.gcl_au, 100),

    first_touch_at: iso(firstTouch.at),
    first_landing_url: str(firstTouch.landing_url, 2000),
    first_referrer_url: str(firstTouch.referrer_url, 1000),
    first_utm_source: str(firstParams.utm_source),
    first_utm_medium: str(firstParams.utm_medium),
    first_utm_campaign: str(firstParams.utm_campaign),
    first_utm_term: str(firstParams.utm_term),
    first_utm_content: str(firstParams.utm_content),
    first_gclid: str(firstParams.gclid),
    first_fbclid: str(firstParams.fbclid),
    first_msclkid: str(firstParams.msclkid),
    first_touch_params: Object.keys(firstParams).length ? firstParams : null,
  };
}

export type TrackingRow = ReturnType<typeof buildTrackingRow>;
