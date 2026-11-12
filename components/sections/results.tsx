import { ArrowRight } from "lucide-react";
import { results } from "@/content/results";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";
import { ReviewButton } from "@/components/client/review-button";
import { Section, SectionHeader } from "@/components/ui/section";

/** 2 — Approved settlement examples: label, amount, case type. Qualifier close to the group, one CTA after. */
export function Results({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const r = dict.results;
  if (results.length === 0) return null;
  return (
    <Section id="results" tone="surface" labelledBy="results-title">
      <SectionHeader id="results-title" title={r.title} lede={r.lede} />
      <p className="mt-6 font-bold text-navy">{r.referral}</p>
      <ul className="mt-4 grid gap-3 sm:gap-5 lg:grid-cols-3">
        {results.map((result) => (
          <li key={result.id}>
            <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card lg:p-6">
              <span className="self-start rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">
                {r.outcome}
              </span>
              <p className="display mt-3 text-[2.25rem] text-navy tabular-nums lg:mt-5 lg:text-[2.75rem]">
                {result.amount[lang]}
              </p>
              <h3 className="mt-1 text-lg font-bold text-navy lg:mt-2">{result.caseType[lang]}</h3>
              {result.detail && <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{result.detail[lang]}</p>}
            </article>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted">{r.qualifier}</p>
      <ReviewButton lang={lang} source="results" className="btn btn-amber mt-7 w-full sm:w-auto">
        {dict.common.startReview}
        <ArrowRight aria-hidden className="size-5" strokeWidth={2.25} />
      </ReviewButton>
    </Section>
  );
}
