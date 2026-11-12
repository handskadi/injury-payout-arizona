import { Check, Phone } from "lucide-react";
import { phone } from "@/content/site";
import type { Dictionary } from "@/dictionaries";
import { fmt } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import { CallLink } from "@/components/client/call-link";
import { HeroEvaluator } from "@/components/evaluator/hero-card";

/**
 * 1 — Hero + embedded case review. Desktop: proposition, reassurance and one
 * approved past result left; evaluator right. Mobile: headline, reassurance,
 * evaluator, then the past-result card. Phone is secondary.
 */
export function Hero({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const h = dict.hero;
  return (
    <section aria-labelledby="hero-title" className="on-navy bg-navy text-white">
      <div className="page-wrap grid gap-6 pt-6 pb-10 sm:pt-10 sm:pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,31rem)] lg:gap-16 lg:pt-16 lg:pb-20">
        <div className="lg:pt-6">
          <h1 id="hero-title" className="display text-[2.375rem] sm:text-6xl lg:text-[4.5rem]">
            {h.titleBefore}
            <span className="text-amber">{h.titleHighlight}</span>
            {h.titleAfter}
          </h1>
          <p className="mt-5 hidden max-w-xl text-lg leading-relaxed text-white/80 sm:block">{h.lede}</p>
          <p className="mt-4 flex items-center gap-2 text-[0.9375rem] font-semibold text-white sm:mt-6">
            <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full bg-amber text-navy">
              <Check className="size-3" strokeWidth={3.5} />
            </span>
            {h.reassurance}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75">{h.disclosure}</p>
          <div className="hidden lg:block">
            <ProofCard dict={dict} className="mt-10" />
            <CallLine dict={dict} className="mt-6" />
          </div>
        </div>

        <div>
          <HeroEvaluator t={dict.evaluator} cats={dict.categories} lang={lang} />
          <div className="lg:hidden">
            <ProofCard dict={dict} className="mt-6" />
            <CallLine dict={dict} className="mt-4" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** One approved settlement amount, with its qualifier immediately beside it. */
function ProofCard({ dict, className }: { dict: Dictionary; className: string }) {
  const h = dict.hero;
  return (
    <figure className={`max-w-md rounded-2xl border border-white/15 bg-white/[0.04] p-5 ${className}`}>
      <p className="text-xl leading-snug font-semibold text-white">
        {h.proofBefore}
        <span className="display text-[1.75rem] text-amber">{h.proofAmount}</span>
        {h.proofAfter}
      </p>
      <figcaption className="mt-2 text-sm text-white/70">{h.proofQualifier}</figcaption>
    </figure>
  );
}

function CallLine({ dict, className }: { dict: Dictionary; className: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 text-[0.9375rem] text-white/80 ${className}`}>
      {dict.common.callPrompt}
      <CallLink location="hero" className="inline-flex min-h-11 items-center gap-1.5 font-bold text-amber tabular-nums">
        <Phone aria-hidden className="size-4" strokeWidth={2.25} />
        {fmt(dict.common.call, { phone: phone.display })}
      </CallLink>
    </p>
  );
}
