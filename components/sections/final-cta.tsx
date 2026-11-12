import { ArrowRight } from "lucide-react";
import { phone } from "@/content/site";
import type { Dictionary } from "@/dictionaries";
import { fmt } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import { CallLink } from "@/components/client/call-link";
import { ReviewButton } from "@/components/client/review-button";
import { FINAL_CTA_ACTIONS_ID } from "@/lib/evaluator/ids";

/** 8 — Closing CTA: one amber button back to the shared evaluator; phone is a smaller link. */
export function FinalCta({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const f = dict.finalCta;
  return (
    <section aria-labelledby="final-title" className="on-navy bg-navy text-white">
      <div className="page-wrap py-12 text-center sm:py-16 lg:py-20">
        <h2 id="final-title" className="display mx-auto max-w-3xl text-[2.25rem] sm:text-5xl lg:text-6xl">
          {f.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">{f.body}</p>
        <div id={FINAL_CTA_ACTIONS_ID} className="mt-6 flex flex-col items-center gap-3">
          <ReviewButton lang={lang} source="final_cta" className="btn btn-amber w-full px-7 text-[1.0625rem] sm:w-auto">
            {dict.common.startReview}
            <ArrowRight aria-hidden className="size-5" strokeWidth={2.25} />
          </ReviewButton>
          <p className="flex flex-wrap items-center justify-center gap-x-1.5 text-[0.9375rem] text-white/80">
            {dict.common.callPrompt}
            <CallLink
              location="final_cta"
              className="inline-flex min-h-11 items-center font-bold text-amber tabular-nums underline-offset-2 hover:underline"
            >
              {fmt(dict.common.call, { phone: phone.display })}
            </CallLink>
          </p>
        </div>
      </div>
    </section>
  );
}
