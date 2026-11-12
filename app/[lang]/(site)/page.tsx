import { notFound } from "next/navigation";
import { siteUrl } from "@/content/site";
import { getDictionary } from "@/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileActionBar } from "@/components/client/mobile-action-bar";
import { Hero } from "@/components/sections/hero";
import { Results } from "@/components/sections/results";
import { Experiences } from "@/components/sections/experiences";
import { LegalTeam } from "@/components/sections/legal-team";
import { HowItWorks } from "@/components/sections/how-it-works";
import { AccidentTypes } from "@/components/sections/accident-types";
import { Compensation } from "@/components/sections/compensation";
import { CostsAndFaqs } from "@/components/sections/costs-faqs";
import { FinalCta } from "@/components/sections/final-cta";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return buildMetadata({ lang, path: "/", title: dict.meta.title, description: dict.meta.description });
}

/** Page order per the Final developer brief (08 Nov 2026, p.02). */
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Injury Payout",
            url: siteUrl,
            logo: `${siteUrl}/brand/injury-payout-avatar-navy@3x.png`,
          }),
        }}
      />
      <SiteHeader dict={dict} lang={lang} home />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero dict={dict} lang={lang} />
        <Results dict={dict} lang={lang} />
        <Experiences dict={dict} lang={lang} />
        <LegalTeam dict={dict} lang={lang} />
        <HowItWorks dict={dict} />
        <AccidentTypes dict={dict} lang={lang} />
        <Compensation dict={dict} />
        <CostsAndFaqs dict={dict} />
        <FinalCta dict={dict} lang={lang} />
      </main>
      <SiteFooter dict={dict} lang={lang} />
      <MobileActionBar lang={lang} review={dict.mobileBar.review} call={dict.mobileBar.call} />
    </>
  );
}
