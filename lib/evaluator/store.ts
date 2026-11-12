"use client";

import { useSyncExternalStore } from "react";
import type { CategoryId } from "@/content/categories";
import { intakeMode } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { track, setAnalyticsContext, PAGE_VERSION, type CtaSource } from "@/lib/analytics";
import { getTracking } from "@/lib/attribution";
import { currentMonthIndex, validateAll, validateStep } from "./validate";
import { emptyValues, stepFields, type Errors, type Field, type Step, type Values } from "./types";

/**
 * The three-step case review. Step 1 is in the homepage hero and at /form/1;
 * each step has its own URL (/form/1…3, thank-you at /form/complete). Answers
 * live in this module — in memory only — so they survive the step pages and
 * the EN ⇄ ES switch, but never enter the URL or browser storage; a refresh
 * clears them.
 */
export type Phase = "editing" | "submitting" | "failed" | "done";
export type FailReason = "network" | "server" | "rate_limited";

export type EvaluatorState = {
  lang: Locale;
  step: Step;
  phase: Phase;
  values: Values;
  errors: Errors;
  attempted: Record<Step, boolean>;
  started: boolean;
  startedAt: number | null;
  idempotencyKey: string;
  enquiryId: string | null;
  failReason: FailReason | null;
  direction: 1 | -1;
  /** Bumped to ask the active view to focus its first invalid field. */
  focusToken: number;
};

const newKey = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

const initial: EvaluatorState = {
  lang: "en",
  step: 1,
  phase: "editing",
  values: emptyValues,
  errors: {},
  attempted: { 1: false, 2: false, 3: false },
  started: false,
  startedAt: null,
  idempotencyKey: "",
  enquiryId: null,
  failReason: null,
  direction: 1,
  focusToken: 0,
};

let state: EvaluatorState = initial;
/** The CTA that last brought the visitor to the form — attributed to "evaluator_started". */
let lastSource: CtaSource = "hero";
const listeners = new Set<() => void>();

function set(patch: Partial<EvaluatorState> | ((s: EvaluatorState) => Partial<EvaluatorState>)) {
  state = { ...state, ...(typeof patch === "function" ? patch(state) : patch) };
  listeners.forEach((l) => l());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useEvaluator(): EvaluatorState {
  return useSyncExternalStore(subscribe, () => state, () => initial);
}

export const getEvaluatorState = () => state;

function withoutStep(step: Step, errors: Errors): Errors {
  const out = { ...errors };
  for (const f of stepFields[step]) delete out[f];
  return out;
}

function firstStepWithErrors(errors: Errors): Step | null {
  for (const step of [1, 2, 3] as Step[]) if (stepFields[step].some((f) => errors[f])) return step;
  return null;
}

/** "Evaluator started" = first substantive interaction with the form, once per form instance. */
function markStarted() {
  if (state.started) return;
  set({ started: true, startedAt: Date.now(), idempotencyKey: state.idempotencyKey || newKey() });
  track({ name: "evaluator_started", source: lastSource });
}

export const evaluator = {
  setLanguage(lang: Locale) {
    setAnalyticsContext({ language: lang, version: PAGE_VERSION });
    if (state.lang !== lang) set({ lang });
  },

  choose(category: CategoryId) {
    markStarted();
    set((s) => {
      const errors = { ...s.errors };
      delete errors.category;
      return { values: { ...s.values, category }, errors };
    });
  },

  update<K extends Field>(field: K, value: Values[K]) {
    markStarted();
    set((s) => {
      const values = { ...s.values, [field]: value };
      if (field === "year" && values.month && Number(values.year) * 12 + Number(values.month) > currentMonthIndex(new Date())) {
        values.month = "";
      }
      if (field === "dateUnknown" && value === true) {
        values.month = "";
        values.year = "";
      }
      // A new ZIP replaces the looked-up place (manual city/state are left alone).
      if (field === "zip" && !values.addressManual) {
        values.city = "";
        values.state = "";
      }
      // After a failed attempt, keep this step's messages live as the user fixes them.
      if (!s.attempted[s.step]) {
        if (!s.errors[field]) return { values };
        const errors = { ...s.errors };
        delete errors[field];
        return { values, errors };
      }
      return { values, errors: { ...withoutStep(s.step, s.errors), ...validateStep(s.step, values, new Date()) } };
    });
  },

  /** ZIP lookup result: fills city/state while that ZIP is still the one entered. */
  applyPlace(zip5: string, place: { city: string; state: string }) {
    set((s) => {
      if (s.values.zip.trim().slice(0, 5) !== zip5) return {};
      if (s.values.addressManual && (s.values.city || s.values.state)) return {};
      return { values: { ...s.values, city: place.city, state: place.state } };
    });
  },

  /** "Enter address manually instead": city and state become editable (prefilled). */
  setAddressManual() {
    set((s) => ({ values: { ...s.values, addressManual: true } }));
  },

  /** Set the honeypot without touching validation. */
  setHoneypot(value: string) {
    set((s) => ({ values: { ...s.values, website: value } }));
  },

  /** On blur, flag a filled-in field that's malformed; empty fields wait for Continue. */
  blur(field: Field) {
    const v = state.values[field];
    if (typeof v !== "string" || !v.trim()) return;
    const found = validateStep(state.step, state.values, new Date())[field];
    set((s) => {
      const errors = { ...s.errors };
      if (found) errors[field] = found;
      else delete errors[field];
      return { errors };
    });
  },

  /** Validate the current step and advance. Returns false when blocked. */
  next(): boolean {
    const s = state;
    const errors = validateStep(s.step, s.values, new Date());
    if (Object.keys(errors).length > 0) {
      track({ name: "validation_error", step: s.step, fields: Object.values(errors) as string[] });
      set({
        errors: { ...s.errors, ...errors },
        attempted: { ...s.attempted, [s.step]: true },
        focusToken: s.focusToken + 1,
      });
      return false;
    }
    // A retry after a failed send is not a new step transition.
    if (!(s.step === 3 && s.phase === "failed")) track({ name: "step_completed", step: s.step });
    if (s.step === 3) {
      void evaluator.submit();
      return true;
    }
    set({
      step: (s.step + 1) as Step,
      direction: 1,
      errors: withoutStep(s.step, s.errors),
    });
    return true;
  },

  back() {
    if (state.step === 1 || state.phase === "submitting") return;
    track({ name: "step_back", step: state.step });
    set((s) => ({ step: (s.step - 1) as Step, direction: -1, phase: s.phase === "failed" ? "editing" : s.phase }));
  },

  goTo(step: Step) {
    if (state.phase === "submitting") return;
    set((s) => ({ step, direction: step < s.step ? -1 : 1 }));
  },

  /** Align the store with the step page being shown (the URL is the source of truth). */
  syncStep(step: Step) {
    if (state.step !== step) set((s) => ({ step, direction: step < s.step ? -1 : 1 }));
  },

  /** First step whose answers are missing — guards direct hits on later step pages. */
  firstIncomplete(): Step {
    for (const step of [1, 2] as Step[]) {
      if (Object.keys(validateStep(step, state.values, new Date())).length > 0) return step;
    }
    return 3;
  },

  /** Every review CTA on the site enters here: step 1 of the form, category pre-selected. */
  start(opts: { source: CtaSource; category?: CategoryId }) {
    lastSource = opts.source;
    if (state.phase === "submitting") return;
    if (state.phase === "done") evaluator.reset();
    if (opts.category) evaluator.choose(opts.category);
    set({ step: 1, direction: 1 });
  },

  reset() {
    set((s) => ({
      ...initial,
      lang: s.lang,
      focusToken: s.focusToken,
    }));
  },

  async submit() {
    const s = state;
    if (s.phase === "submitting" || s.phase === "done") return;

    const errors = validateAll(s.values, new Date());
    const blocked = firstStepWithErrors(errors);
    if (blocked) {
      set({
        step: blocked,
        errors,
        attempted: { ...s.attempted, [blocked]: true },
        focusToken: s.focusToken + 1,
      });
      return;
    }

    set({ phase: "submitting", failReason: null, idempotencyKey: s.idempotencyKey || newKey() });

    if (intakeMode === "demo") {
      // Mockup: no endpoint, no CRM, no follow-up, no lead conversion event.
      await new Promise((r) => setTimeout(r, 650));
      set({ phase: "done", direction: 1 });
      track({ name: "demo_completed" });
      return;
    }

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json", "idempotency-key": state.idempotencyKey },
        body: JSON.stringify({
          values: s.values,
          language: s.lang,
          startedAt: s.startedAt,
          tracking: getTracking(),
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as { enquiryId?: string };
        if (!data.enquiryId) throw new Error("missing enquiry id");
        set({ phase: "done", enquiryId: data.enquiryId, direction: 1 });
        track({ name: "lead_submitted", enquiry_id: data.enquiryId });
        return;
      }
      if (res.status === 422) {
        const data = (await res.json().catch(() => ({}))) as { errors?: Errors };
        const serverErrors = data.errors ?? {};
        const step = firstStepWithErrors(serverErrors) ?? 3;
        set((cur) => ({
          phase: "editing",
          step,
          errors: serverErrors,
          attempted: { ...cur.attempted, [step]: true },
          focusToken: cur.focusToken + 1,
        }));
        return;
      }
      const reason = res.status === 429 ? "rate_limited" : "server";
      track({ name: "submit_failed", reason });
      set({ phase: "failed", failReason: reason });
    } catch {
      track({ name: "submit_failed", reason: "network" });
      set({ phase: "failed", failReason: "network" });
    }
  },
};
