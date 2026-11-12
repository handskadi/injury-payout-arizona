"use client";

import { EVALUATOR_ID } from "./ids";

export { EVALUATOR_ID, FINAL_CTA_ACTIONS_ID } from "./ids";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Focus the active question's heading inside the hero evaluator. */
export function focusActiveQuestion() {
  document
    .getElementById(EVALUATOR_ID)
    ?.querySelector<HTMLElement>("[data-step-heading]")
    ?.focus({ preventScroll: true });
}

/**
 * Scroll the shared hero evaluator into view (respecting reduced motion) and
 * focus its active question. Returns false when this page has no evaluator.
 */
export function revealEvaluator(): boolean {
  const card = document.getElementById(EVALUATOR_ID);
  if (!card) return false;
  card.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  // After React has rendered any step change the CTA caused.
  requestAnimationFrame(focusActiveQuestion);
  return true;
}

/** Bring a step that just changed into view without jumping when it is already visible. */
export function keepInView(el: HTMLElement) {
  const card = el.closest<HTMLElement>(`#${EVALUATOR_ID}`) ?? el;
  const top = card.getBoundingClientRect().top;
  const headingTop = el.getBoundingClientRect().top;
  if (headingTop < 80 || headingTop > window.innerHeight - 160 || top > window.innerHeight) {
    card.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }
}
