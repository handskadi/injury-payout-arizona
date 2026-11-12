/**
 * Build-time switches. Both default to the safe review/demo posture.
 *
 * NEXT_PUBLIC_SITE_MODE=review      (default) labelled placeholders + pending
 *                                   reference content are visible, noindex.
 * NEXT_PUBLIC_SITE_MODE=production  incomplete proof is hidden; only content
 *                                   that passes its publication gate renders.
 *
 * NEXT_PUBLIC_INTAKE_MODE=demo      (default) no lead endpoint; completion says
 *                                   "Demo complete. No enquiry was sent."
 * NEXT_PUBLIC_INTAKE_MODE=live      posts to /api/enquiry (needs INTAKE_WEBHOOK_URL).
 */
export const siteMode: "review" | "production" =
  process.env.NEXT_PUBLIC_SITE_MODE === "production" ? "production" : "review";

export const intakeMode: "demo" | "live" =
  process.env.NEXT_PUBLIC_INTAKE_MODE === "live" ? "live" : "demo";

export const isReview = siteMode === "review";

/**
 * Absolute base for canonical, Open Graph and share-image URLs. On Vercel it
 * follows the project's production domain (injurypayout.vercel.app until the
 * real domain is attached), so WhatsApp and other link previews can reach it.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://injurypayout.com")
).replace(/\/$/, "");

export const brand = {
  name: "Injury Payout",
  domain: "InjuryPayout.com",
};

/**
 * Authorised STAGING number (Final developer brief, p.01). Replace with the
 * approved live number before launch; every call link reads from here.
 */
export const phone = {
  display: "(917) 905-3630",
  tel: "+19179053630",
  isPlaceholder: true,
};
