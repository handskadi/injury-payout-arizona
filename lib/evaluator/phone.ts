/** Digits of a US number without the +1 country code, or null. */
export function usDigits(input: string): string | null {
  let digits = input.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  if (digits.length !== 10) return null;
  // NANP: area code and exchange can't start with 0 or 1.
  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(digits)) return null;
  return digits;
}

/** E.164, e.g. +12125550123. Normalisation happens again server-side. */
export function toE164(input: string): string | null {
  const digits = usDigits(input);
  return digits ? `+1${digits}` : null;
}

/** Progressive "(212) 555-0123" formatting while typing; leaves other shapes alone. */
export function formatAsYouType(input: string): string {
  const raw = input.replace(/\D/g, "");
  if (input.trim().startsWith("+") && !input.trim().startsWith("+1")) return input;
  const digits = (raw.length > 10 && raw.startsWith("1") ? raw.slice(1) : raw).slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
