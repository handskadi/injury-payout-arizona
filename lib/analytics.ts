"use client";

import type { Locale } from "@/lib/i18n";

/**
 * Funnel events pushed to window.dataLayer (ready for GTM once a container is
 * added — none is loaded today) and kept on window.__injuryPayoutDiagnostics.
 * Payload types make it impossible to pass names, phone, email, ZIP,
 * narratives, consent text or the injury category (brief p.18: category stays
 * in the CRM, not in ad-platform payloads, by default).
 */
/** Page/copy version label, so traffic tests can be compared by version. */
export const PAGE_VERSION = "final-brief-2026-11-08";
export type FormVersion = typeof PAGE_VERSION;

export type CtaSource =
  | "hero"
  | "header"
  | "mobile_bar"
  | "accident_types"
  | "results"
  | "final_cta";

export type DiagnosticEvent =
  | { name: "evaluator_started"; source: CtaSource }
  | { name: "step_viewed"; step: 1 | 2 | 3 | "complete" }
  | { name: "step_completed"; step: 1 | 2 | 3 }
  | { name: "validation_error"; step: 1 | 2 | 3; fields: string[] }
  | { name: "step_back"; step: 1 | 2 | 3 }
  | { name: "demo_completed" }
  | { name: "lead_submitted"; enquiry_id?: string }
  | { name: "submit_failed"; reason: string }
  | { name: "call_cta_clicked"; location: string }
  | { name: "language_change"; to: Locale };

type Entry = Record<string, unknown> & { event: string; page_version: FormVersion; language: Locale };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    __injuryPayoutDiagnostics?: Entry[];
  }
}

let context: { language: Locale; version: FormVersion } = { language: "en", version: PAGE_VERSION };

export const setAnalyticsContext = (next: { language: Locale; version: FormVersion }) => {
  context = next;
};

export function track(event: DiagnosticEvent) {
  if (typeof window === "undefined") return;
  const { name, ...payload } = event;
  const entry: Entry = { event: name, page_version: context.version, language: context.language, ...payload };
  (window.dataLayer ??= []).push(entry);
  (window.__injuryPayoutDiagnostics ??= []).push(entry);
  if (process.env.NODE_ENV !== "production") console.debug("[tracking]", entry);
}
