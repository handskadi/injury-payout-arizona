import type { CategoryId } from "@/content/categories";

export type Step = 1 | 2 | 3;

export type Values = {
  category: CategoryId | null;
  zip: string;
  /** Optional address. City/state are filled from the ZIP lookup (or typed, in manual mode). */
  streetAddress: string;
  city: string;
  state: string;
  /** "Enter address manually instead" was chosen: city and state become editable fields. */
  addressManual: boolean;
  month: string; // "1".."12" or ""
  year: string; // "2026" or ""
  dateUnknown: boolean;
  description: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  /** The step-3 agreement checkbox — submit stays disabled until it is checked. */
  consent: boolean;
  /** Honeypot — real people never see or fill it. */
  website: string;
};

export type Field = Exclude<keyof Values, "website">;

export type ErrorCode =
  | "category.required"
  | "zip.required"
  | "zip.invalid"
  | "month.required"
  | "year.required"
  | "date.future"
  | "description.tooLong"
  | "firstName.required"
  | "lastName.required"
  | "phone.required"
  | "phone.invalid"
  | "email.required"
  | "email.invalid"
  | "consent.required";

export type Errors = Partial<Record<Field, ErrorCode>>;

export const stepFields: Record<Step, Field[]> = {
  1: ["category"],
  2: ["month", "year", "dateUnknown", "description"],
  3: ["firstName", "lastName", "phone", "email", "zip", "streetAddress", "city", "state", "addressManual", "consent"],
};

export const emptyValues: Values = {
  category: null,
  zip: "",
  streetAddress: "",
  city: "",
  state: "",
  addressManual: false,
  month: "",
  year: "",
  dateUnknown: false,
  description: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  consent: false,
  website: "",
};

/** Incident date as stored with an enquiry — approximate or explicitly unknown. */
export type IncidentDate = { kind: "approximate"; month: number; year: number } | { kind: "unknown" };
