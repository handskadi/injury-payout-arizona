import { notFound } from "next/navigation";
import { Phone } from "lucide-react";
import { phone } from "@/content/site";
import { getDictionary } from "@/dictionaries";
import { fmt } from "@/lib/format";
import { hasLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CallLink } from "@/components/client/call-link";
import { ReviewFlow } from "@/components/evaluator/review-flow";

const steps = ["1", "2", "3", "complete"] as const;
type StepParam = (typeof steps)[number];
const isStep = (v: string): v is StepParam => (steps as readonly string[]).includes(v);
const toUrlStep = (v: StepParam) => (v === "complete" ? "complete" : (Number(v) as 1 | 2 | 3));

export const dynamicParams = false;
export async function generateStaticParams() {
  return steps.map((step) => ({ step }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/form/[step]">) {
  const { lang, step } = await params;
  if (!hasLocale(lang) || !isStep(step)) return {};
  const dict = getDictionary(lang);
  const label = step === "complete" ? dict.evaluator.liveDone.pageTitle : fmt(dict.evaluator.stepOf, { n: step });
  return buildMetadata({
    lang,
    path: `/form/${step}`,
    title: `${label} — ${dict.evaluator.cardTitle} — Injury Payout`,
    description: dict.meta.description,
    noindex: true,
  });
}

/** Focused form page — one URL per step. */
export default async function FormStep({ params }: PageProps<"/[lang]/form/[step]">) {
  const { lang, step } = await params;
  if (!hasLocale(lang) || !isStep(step)) notFound();
  const dict = getDictionary(lang);
  return (
    <>
      <SiteHeader dict={dict} lang={lang} focused />
      <main id="main" tabIndex={-1} className="bg-surface outline-none">
        <div className="mx-auto max-w-2xl px-4 pt-5 pb-16 sm:pt-8">
          <h1 className="display mb-4 text-[1.75rem] text-navy sm:text-[2.25rem]">{dict.evaluator.cardTitle}</h1>
          <ReviewFlow urlStep={toUrlStep(step)} t={dict.evaluator} cats={dict.categories} lang={lang} />
          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[0.9375rem] text-muted">
            {dict.common.callPrompt}
            <CallLink location="review_page" className="inline-flex min-h-11 items-center gap-1.5 font-bold text-blue tabular-nums">
              <Phone aria-hidden className="size-4" strokeWidth={2.25} />
              {phone.display}
            </CallLink>
          </p>
        </div>
      </main>
      <SiteFooter dict={dict} lang={lang} />
    </>
  );
}
