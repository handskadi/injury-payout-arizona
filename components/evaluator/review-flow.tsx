"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { track } from "@/lib/analytics";
import { homePath, formPath, type Locale } from "@/lib/i18n";
import { evaluator, getEvaluatorState, useEvaluator } from "@/lib/evaluator/store";
import type { Step } from "@/lib/evaluator/types";
import { previousPath } from "@/lib/nav-history";
import { useHydrated } from "@/components/client/hydrated";
import { Progress, StepView, type CategoryText, type EvalText } from "./steps";

type UrlStep = Step | "complete";

/**
 * Form page. The URL decides the step; the in-memory store holds the
 * answers. Later steps without the earlier answers (refresh, direct hit)
 * send the visitor back to the first missing step.
 */
export function ReviewFlow({ urlStep, t, cats, lang }: { urlStep: UrlStep; t: EvalText; cats: CategoryText; lang: Locale }) {
  const s = useEvaluator();
  const router = useRouter();
  const hydrated = useHydrated();
  const ready = useRef(false);

  const go = (target: UrlStep, backwards: boolean) => {
    const href = formPath(lang, target);
    const prev = previousPath();
    if (backwards && (prev === href || (target === 1 && prev === homePath(lang)))) router.back();
    else if (backwards) router.replace(href);
    else router.push(href);
  };

  // Guard and sync on arrival.
  useEffect(() => {
    const cur = getEvaluatorState();
    if (urlStep === "complete") {
      if (cur.phase !== "done") return router.replace(formPath(lang, 1));
    } else {
      if (cur.phase === "done") return router.replace(formPath(lang, "complete"));
      const missing = evaluator.firstIncomplete();
      if (urlStep > missing) return router.replace(formPath(lang, missing));
      evaluator.syncStep(urlStep);
    }
    ready.current = true;
    // Each step is a new page: start at the top (the sticky header stops Next from doing it).
    window.scrollTo({ top: 0 });
    track({ name: "step_viewed", step: urlStep });
  }, [urlStep, lang, router]);

  // Follow the store when Continue / Back / submit / Start over move it.
  const last = useRef<{ step: Step; phase: string } | null>(null);
  useEffect(() => {
    const before = last.current;
    last.current = { step: s.step, phase: s.phase };
    if (!before || !ready.current) return;
    if (s.phase === "done") {
      if (urlStep !== "complete") go("complete", false);
      return;
    }
    if (urlStep === "complete") return go(s.step, false);
    if (s.step !== urlStep) go(s.step, s.step < urlStep);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s.step, s.phase]);

  const blocked =
    !hydrated ||
    (urlStep === "complete" ? s.phase !== "done" : s.phase === "done" || urlStep > evaluator.firstIncomplete());

  return (
    <div className="rounded-2xl bg-white p-5 text-navy shadow-card sm:px-8 sm:py-7">
      {urlStep !== "complete" && (
        <div className="mb-5">
          <Progress step={urlStep} t={t} />
        </div>
      )}
      {!blocked && (
        <StepView
          t={t}
          cats={cats}
          lang={lang}
          variant="page"
          active
          step={urlStep === "complete" ? undefined : urlStep}
        />
      )}
      {blocked && <div className="min-h-[22rem]" aria-hidden />}
    </div>
  );
}
