# Injury Payout — InjuryPayout.com

Next.js 16 build of the **Final developer brief (08 Nov 2026)**, which supersedes the earlier v1.1 brief and V2 refinement brief. The pre-final-brief version is commit `adada27` in git history, kept for future comparison.

```bash
npm install
npm run dev        # http://localhost:3000  ·  /es for Spanish
npm run build && npm start
```

## Pages

- Homepage: `/` (English), `/es` (Spanish).
- Page order: Hero + embedded case review → Settlement examples → (Testimonials, only when approved) → Attorney → How it works → Injury types → What compensation may cover → Costs and FAQs → Closing CTA → Footer.
- Policy pages: `/privacy`, `/terms`, `/disclaimer` (placeholders until the firm supplies the text).
- Old links redirect (308): `/v2/…` → same page at the root; `/form/…` → homepage `#evaluator`.

## The case review

- One three-step form, embedded in the hero (`components/evaluator`). Every review CTA, the header button, the mobile bar and the injury-type cards use this same instance.
- CTAs scroll to the form and focus the active question. They never reset answers or change the step. An injury card sets the category and opens step 2; Back edits the choice.
- Off the homepage, CTAs go to `/#evaluator` (or `/es#evaluator`).
- Answers live in memory only (never in the URL or browser storage). They survive the EN ⇄ ES switch; a refresh clears them.
- ZIP is required. The incident date accepts an approximate month/year or "I'm not sure".
- No consent text is shown until the firm supplies the approved EN/ES wording (brief p.15). Until `content/rules.ts` → `consentVersion` is set, `/api/enquiry` refuses live submissions.
- All visible copy comes word for word from the Final developer brief. Do not add helper text, placeholders or extra labels.

## Code

- Pages: `app/[lang]/(site)`. Sections: `components/sections`.
- Copy: `dictionaries/en.ts` and `es.ts`. Spanish is typed against English, so a missing key fails the build.
- Form state, validation and API client: `lib/evaluator`.
- Content: `content/` holds the staging phone, firm, approved settlement figures, attorney profile, testimonials and categories.
- Layout: the `.page-wrap` container is about 1,200px wide, with 20 / 24 / 32px gutters. Section padding is 48px on mobile, 64px on tablet and 80px on desktop.

## Identity pack (`brand/identity-pack/`)

- Header, footer and 404 page use the outlined wordmark SVGs (`public/brand/injury-payout-wordmark-primary.svg`; `-white.svg` on dark).
- Icon URLs carry `?v=2`. Bump it whenever the icons change.
- Browser icons, Apple touch icon, web manifest and `public/og-image.png` (1200×630) come from the pack.
- `robots.txt` lets link-preview bots read pages while search engines stay blocked in review mode.

## Tracking

Events are pushed to `window.dataLayer`. They carry no personal data and no injury category, and every event has `page_version` (`final-brief-2026-11-08`):

- `evaluator_started` (first real interaction with the form)
- `step_completed`
- `validation_error`
- `step_back`
- `demo_completed`
- `lead_submitted` (live only)
- `submit_failed`
- `call_cta_clicked`
- `language_change`

No GTM container is loaded yet.

## Modes (`.env.example`)

- `NEXT_PUBLIC_SITE_MODE=review` (default) sets `noindex`. `production` allows indexing.
- `NEXT_PUBLIC_INTAKE_MODE=demo` (default) sends nothing.
- `NEXT_PUBLIC_INTAKE_MODE=live` posts to `/api/enquiry`, which needs `INTAKE_WEBHOOK_URL` and `INTAKE_WEBHOOK_SECRET`.

## Still needed before launch (brief p.19)

- Firm: fee model (FAQ 1), supported states and case types, the policy for people who already have an attorney (FAQ 8), and Spanish intake.
- Firm: approved EN/ES consent, privacy, terms and advertising text; office and contact details.
- Firm: the original attorney portrait (`content/team.ts` → `photo`) and confirmation of role and biography.
- Operations: live phone number (`content/site.ts`), domain and DNS, CRM destination, routing and the owner of failure alerts.
