"use client";

/**
 * Marketing attribution and device context, sent with a submitted inquiry and
 * stored in public.injury_payout_lead_tracking (one row per lead). Never put
 * in analytics payloads, and never mixed with form answers.
 *
 * - Device ID: random first-party cookie (1 year), so the same browser keeps it.
 * - Session ID: random, per browser-tab session.
 * - First touch: the first visit's landing page, referrer and every URL
 *   parameter, kept on the device (localStorage) so later visits keep it.
 * - Last touch: this session's landing page, referrer and parameters; a new
 *   campaign click replaces it.
 * - Meta: _fbc from the fbclid (Meta's fb.1.<time>.<fbclid> format) and _fbp
 *   (fb.1.<time>.<random>) as first-party cookies, unless the Pixel set them.
 */

export { TRACKED_PARAMS } from "./tracking-params";

export type Touch = {
  at: string;
  landing_url: string;
  referrer_url: string | null;
  /** Every query parameter on the landing URL (lower-cased keys, capped). */
  params: Record<string, string>;
};

export type ClientTracking = {
  device_id: string | null;
  session_id: string | null;
  session_started_at: string | null;
  first_touch: Touch | null;
  last_touch: Touch | null;
  submit_url: string;
  fbc: string | null;
  fbp: string | null;
  ga_cookie: string | null;
  gcl_aw: string | null;
  gcl_au: string | null;
  browser: {
    user_agent: string;
    ua_platform: string | null;
    ua_mobile: boolean | null;
    ua_brands: string | null;
    language: string | null;
    languages: string[];
    timezone: string | null;
    timezone_offset_min: number;
    screen_width: number;
    screen_height: number;
    viewport_width: number;
    viewport_height: number;
    pixel_ratio: number;
    color_depth: number;
    touch_points: number;
    hardware_concurrency: number | null;
    device_memory_gb: number | null;
    connection_type: string | null;
    cookies_enabled: boolean;
    do_not_track: string | null;
  };
};

const DEVICE_COOKIE = "ip_did";
const FIRST_TOUCH_KEY = "ip_first_touch";
const LAST_TOUCH_KEY = "ip_last_touch";
const SESSION_KEY = "ip_sid";
const SESSION_START_KEY = "ip_session_start";
const YEAR = 365 * 24 * 60 * 60;
const NINETY_DAYS = 90 * 24 * 60 * 60;

/** Storage and cookies can throw (private mode, blocked site data): never break the form. */
function safe<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

const local = () => safe<Storage | null>(() => window.localStorage, null);
const session = () => safe<Storage | null>(() => window.sessionStorage, null);

function readCookie(name: string): string | null {
  return safe(() => {
    for (const part of document.cookie.split("; ")) {
      const i = part.indexOf("=");
      if (part.slice(0, i) === name) return decodeURIComponent(part.slice(i + 1));
    }
    return null;
  }, null);
}

function writeCookie(name: string, value: string, maxAge: number) {
  safe(() => {
    const secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
  }, undefined);
}

const randomId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

function readParams(search: string): Record<string, string> {
  const out: Record<string, string> = {};
  let n = 0;
  for (const [k, v] of new URLSearchParams(search)) {
    const key = k.toLowerCase().slice(0, 60);
    if (!key || key in out || ++n > 60) continue;
    out[key] = v.slice(0, 500);
  }
  return out;
}

const readJson = <T,>(store: Storage | null, key: string): T | null =>
  safe(() => {
    const raw = store?.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  }, null);

const writeJson = (store: Storage | null, key: string, value: unknown) =>
  safe(() => store?.setItem(key, JSON.stringify(value)), undefined);

let captured = false;

/** Runs once per page load (from the site layout). */
export function captureAttribution() {
  if (captured || typeof window === "undefined") return;
  captured = true;

  // Device ID: first-party cookie, renewed for a year on every visit.
  writeCookie(DEVICE_COOKIE, readCookie(DEVICE_COOKIE) ?? randomId(), YEAR);

  // Session ID and session start, per tab session.
  const ss = session();
  if (ss && !safe(() => ss.getItem(SESSION_KEY), null)) {
    safe(() => ss.setItem(SESSION_KEY, randomId()), undefined);
    safe(() => ss.setItem(SESSION_START_KEY, new Date().toISOString()), undefined);
  }

  const params = readParams(location.search);
  const referrer =
    document.referrer && !document.referrer.startsWith(location.origin) ? document.referrer.slice(0, 1000) : null;
  const touch: Touch = { at: new Date().toISOString(), landing_url: location.href.slice(0, 2000), referrer_url: referrer, params };

  if (!readJson<Touch>(local(), FIRST_TOUCH_KEY)) writeJson(local(), FIRST_TOUCH_KEY, touch);
  if (!readJson<Touch>(ss, LAST_TOUCH_KEY) || Object.keys(params).length > 0 || referrer) writeJson(ss, LAST_TOUCH_KEY, touch);

  // Meta click and browser IDs (only when the Meta Pixel hasn't set them).
  if (params.fbclid && !readCookie("_fbc")) writeCookie("_fbc", `fb.1.${Date.now()}.${params.fbclid}`, NINETY_DAYS);
  if (!readCookie("_fbp")) writeCookie("_fbp", `fb.1.${Date.now()}.${Math.floor(Math.random() * 1e10)}`, NINETY_DAYS);
}

/** Everything sent with the inquiry, read at the moment of submission. */
export function getTracking(): ClientTracking {
  const nav = navigator as Navigator & {
    userAgentData?: { platform?: string; mobile?: boolean; brands?: { brand: string; version: string }[] };
    deviceMemory?: number;
    connection?: { effectiveType?: string };
  };
  return {
    device_id: readCookie(DEVICE_COOKIE),
    session_id: safe(() => session()?.getItem(SESSION_KEY) ?? null, null),
    session_started_at: safe(() => session()?.getItem(SESSION_START_KEY) ?? null, null),
    first_touch: readJson<Touch>(local(), FIRST_TOUCH_KEY),
    last_touch: readJson<Touch>(session(), LAST_TOUCH_KEY),
    submit_url: location.href.slice(0, 2000),
    fbc: readCookie("_fbc"),
    fbp: readCookie("_fbp"),
    ga_cookie: readCookie("_ga"),
    gcl_aw: readCookie("_gcl_aw"),
    gcl_au: readCookie("_gcl_au"),
    browser: {
      user_agent: nav.userAgent,
      ua_platform: nav.userAgentData?.platform ?? null,
      ua_mobile: nav.userAgentData?.mobile ?? null,
      ua_brands: nav.userAgentData?.brands?.map((b) => `${b.brand} ${b.version}`).join(", ") || null,
      language: nav.language ?? null,
      languages: [...(nav.languages ?? [])].slice(0, 10),
      timezone: safe(() => Intl.DateTimeFormat().resolvedOptions().timeZone, null),
      timezone_offset_min: new Date().getTimezoneOffset(),
      screen_width: screen.width,
      screen_height: screen.height,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      pixel_ratio: window.devicePixelRatio,
      color_depth: screen.colorDepth,
      touch_points: nav.maxTouchPoints ?? 0,
      hardware_concurrency: nav.hardwareConcurrency ?? null,
      device_memory_gb: nav.deviceMemory ?? null,
      connection_type: nav.connection?.effectiveType ?? null,
      cookies_enabled: nav.cookieEnabled,
      do_not_track: nav.doNotTrack ?? null,
    },
  };
}
