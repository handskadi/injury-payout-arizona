import type { Metadata } from "next";
import { isReview, siteUrl } from "@/content/site";
import { localePath, type Locale } from "./i18n";

/**
 * Self-canonical URL plus reciprocal en-US / es-US alternates. `canonical`
 * lets a page point elsewhere; form pages are never indexed.
 */
export function buildMetadata(opts: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
}): Metadata {
  const { lang, path, title, description } = opts;
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    applicationName: "Injury Payout",
    alternates: {
      canonical: localePath(lang, opts.canonical ?? path),
      languages: {
        "en-US": localePath("en", path),
        "es-US": localePath("es", path),
        "x-default": localePath("en", path),
      },
    },
    // Identity pack: favicons, Apple touch icon and web manifest. Bump ?v= when
    // the icons change so browsers drop their cached copies.
    icons: {
      icon: [
        { url: "/favicon.ico?v=2", sizes: "48x48" },
        { url: "/brand/favicon-16.png?v=2", sizes: "16x16", type: "image/png" },
        { url: "/brand/favicon-32.png?v=2", sizes: "32x32", type: "image/png" },
        { url: "/brand/favicon-48.png?v=2", sizes: "48x48", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/manifest.webmanifest",
    appleWebApp: { title: "Injury Payout" },
    // Link previews (WhatsApp, iMessage, Facebook, LinkedIn, X, Slack…).
    openGraph: {
      type: "website",
      siteName: "Injury Payout",
      title,
      description,
      url: localePath(lang, path),
      locale: lang === "en" ? "en_US" : "es_US",
      alternateLocale: lang === "en" ? "es_US" : "en_US",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Injury Payout", type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: "/og-image.png", alt: "Injury Payout" }],
    },
    // Private review build and variants/form steps stay out of search.
    robots: isReview || opts.noindex ? { index: false, follow: false } : undefined,
    formatDetection: { telephone: false },
  };
}
