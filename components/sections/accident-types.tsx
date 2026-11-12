import { ArrowRight, ChevronRight, Phone } from "lucide-react";
import { enabledCategories } from "@/content/categories";
import { phone } from "@/content/site";
import type { Dictionary } from "@/dictionaries";
import { fmt } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import { CallLink } from "@/components/client/call-link";
import { ReviewButton } from "@/components/client/review-button";
import { categoryIcons } from "@/components/evaluator/category-icons";
import { Section, SectionHeader } from "@/components/ui/section";

/**
 * 5 — Supported injury types. Each whole card is one action: it sets the
 * category and opens step 2 of the shared evaluator. Small phone link after.
 */
export function AccidentTypes({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const t = dict.types;
  return (
    <Section id="injury-types" labelledBy="types-title">
      <SectionHeader id="types-title" title={t.title} lede={t.lede} />
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {enabledCategories.map((id) => {
          const Icon = categoryIcons[id];
          const c = dict.categories[id];
          return (
            <li key={id}>
              <ReviewButton
                lang={lang}
                source="accident_types"
                category={id}
                className="group flex h-full w-full cursor-pointer items-center gap-4 rounded-2xl border border-line bg-white p-4 text-left shadow-card transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-blue hover:shadow-lift sm:flex-col sm:items-start sm:gap-0 sm:p-5"
              >
                <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface text-navy transition-colors group-hover:bg-blue group-hover:text-white">
                  <Icon className="size-6" strokeWidth={2} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col sm:mt-4">
                  <span className="text-lg font-bold text-navy">{c.label}</span>
                  <span className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{c.blurb}</span>
                  <span className="mt-auto hidden items-center gap-1.5 pt-3 text-sm font-bold text-blue sm:inline-flex">
                    {t.cta}
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
                  </span>
                </span>
                <ChevronRight aria-hidden className="size-5 shrink-0 text-blue sm:hidden" strokeWidth={2.5} />
              </ReviewButton>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 flex flex-wrap items-center gap-x-2 text-[0.9375rem] text-muted">
        {dict.common.callPrompt}
        <CallLink location="accident_types" className="inline-flex min-h-11 items-center gap-1.5 font-bold text-blue tabular-nums">
          <Phone aria-hidden className="size-4" strokeWidth={2.25} />
          {fmt(dict.common.call, { phone: phone.display })}
        </CallLink>
      </p>
    </Section>
  );
}
