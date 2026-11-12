import { isCategoryId } from "@/content/categories";
import { evaluatorRules } from "@/content/rules";
import { usDigits } from "./phone";
import type { Errors, IncidentDate, Step, Values } from "./types";

const ZIP = /^\d{5}(-\d{4})?$/;
const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[a-z]{2,}$/i;

/** Month index (year*12 + month) for "now" — US is never ahead of UTC's month. */
export function currentMonthIndex(now: Date, utc = false): number {
  return utc ? now.getUTCFullYear() * 12 + now.getUTCMonth() + 1 : now.getFullYear() * 12 + now.getMonth() + 1;
}

/**
 * Format checks only. A ZIP that passes is not a statement of coverage or
 * eligibility — routing decides that server-side.
 */
export function validateStep(step: Step, v: Values, now: Date, utc = false): Errors {
  const e: Errors = {};
  if (step === 1) {
    if (!isCategoryId(v.category)) e.category = "category.required";
  }
  if (step === 2) {
    if (!v.dateUnknown) {
      const month = Number(v.month);
      const year = Number(v.year);
      if (!v.month) e.month = "month.required";
      if (!v.year) e.year = "year.required";
      if (v.month && v.year && year * 12 + month > currentMonthIndex(now, utc)) e.month = "date.future";
    }
    if (v.description.length > evaluatorRules.descriptionMaxLength) e.description = "description.tooLong";
  }
  if (step === 3) {
    if (!v.firstName.trim()) e.firstName = "firstName.required";
    if (!v.lastName.trim()) e.lastName = "lastName.required";
    if (!v.phone.trim()) e.phone = "phone.required";
    else if (!usDigits(v.phone)) e.phone = "phone.invalid";
    const email = v.email.trim();
    if (!email) e.email = "email.required";
    else if (email.length > evaluatorRules.emailMaxLength || !EMAIL.test(email)) e.email = "email.invalid";
    const zip = v.zip.trim();
    if (!zip) e.zip = "zip.required";
    else if (!ZIP.test(zip)) e.zip = "zip.invalid";
    if (!v.consent) e.consent = "consent.required";
  }
  return e;
}

export function validateAll(v: Values, now: Date, utc = false): Errors {
  return { ...validateStep(1, v, now, utc), ...validateStep(2, v, now, utc), ...validateStep(3, v, now, utc) };
}

export function toIncidentDate(v: Values): IncidentDate {
  return v.dateUnknown ? { kind: "unknown" } : { kind: "approximate", month: Number(v.month), year: Number(v.year) };
}
