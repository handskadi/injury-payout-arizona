"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { formPath, type Locale } from "@/lib/i18n";
import { getEvaluatorState, useEvaluator } from "@/lib/evaluator/store";
import { EVALUATOR_ID, revealEvaluator } from "@/lib/evaluator/reveal";
import { Progress, StepView, type CategoryText, type EvalText } from "./steps";

/**
 * Step 1 is embedded in the hero (the same step as /form/1). Continue moves on
 * to the form pages (/form/2 …), one URL per step.
 */
export function HeroEvaluator({ t, cats, lang }: { t: EvalText; cats: CategoryText; lang: Locale }) {
  const s = useEvaluator();
  const router = useRouter();

  // Old links to /#evaluator: focus the question.
  useEffect(() => {
    if (window.location.hash === `#${EVALUATOR_ID}`) revealEvaluator();
  }, []);

  return (
    <div
      id={EVALUATOR_ID}
      className="relative scroll-mt-24 rounded-2xl bg-white p-4 text-navy shadow-lift min-[400px]:p-5 sm:p-7"
    >
      <h2 className="display text-[1.5rem] sm:text-[1.875rem]">{t.cardTitle}</h2>
      {s.phase !== "done" && (
        <div className="mt-3 mb-4 sm:mb-5">
          <Progress step={1} t={t} />
        </div>
      )}
      <StepView
        t={t}
        cats={cats}
        lang={lang}
        variant="card"
        active
        firstStepOnly
        onAdvance={() => router.push(formPath(lang, Math.max(2, getEvaluatorState().step) as 2 | 3))}
      />
    </div>
  );
}
