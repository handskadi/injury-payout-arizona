export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** BCP 47 tags used for <html lang>, hreflang and Intl formatting. */
export const localeTag: Record<Locale, string> = { en: "en-US", es: "es-US" };

/** English lives at the root (/), Spanish under /es. */
export function localePath(lang: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (lang === "en") return clean || "/";
  return `/es${clean}`;
}

/** Same page in the other language — used by the language switch. */
export function counterpartPath(pathname: string): { lang: Locale; href: string } {
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    return { lang: "en", href: pathname.slice(3) || "/" };
  }
  return { lang: "es", href: pathname === "/" ? "/es" : `/es${pathname}` };
}

/** Homepage: / and /es. */
export const homePath = (lang: Locale) => localePath(lang, "/");

/** Form pages, one URL per step: /form/1 … /form/3, thank-you at /form/complete. */
export const formPath = (lang: Locale, step: 1 | 2 | 3 | "complete") => localePath(lang, `/form/${step}`);
