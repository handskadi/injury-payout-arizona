"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { EVALUATOR_ID, FINAL_CTA_ACTIONS_ID } from "@/lib/evaluator/ids";
import { CallLink } from "./call-link";
import { ReviewButton } from "./review-button";

/**
 * Mobile Free review + Call bar. Shown only after the hero evaluator has left
 * view; hidden while the closing CTA actions are visible and while the form is
 * being completed (focus inside it, or typing in any field).
 */
export function MobileActionBar({ lang, review, call }: { lang: Locale; review: string; call: string }) {
  const [pastHero, setPastHero] = useState(false);
  const [ctaInView, setCtaInView] = useState(false);
  const [formActive, setFormActive] = useState(false);

  useEffect(() => {
    const card = document.getElementById(EVALUATOR_ID);
    const actions = document.getElementById(FINAL_CTA_ACTIONS_ID);
    const observers: IntersectionObserver[] = [];
    if (card) {
      const io = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0));
      io.observe(card);
      observers.push(io);
    }
    if (actions) {
      const io = new IntersectionObserver(([e]) => setCtaInView(e.isIntersecting));
      io.observe(actions);
      observers.push(io);
    }
    const isField = (el: EventTarget | null) =>
      el instanceof HTMLElement && el.matches("input:not([type=radio]):not([type=checkbox]), textarea, select");
    const onIn = (e: FocusEvent) =>
      setFormActive(isField(e.target) || (e.target instanceof Node && !!card?.contains(e.target)));
    const onOut = () => setFormActive(false);
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      observers.forEach((o) => o.disconnect());
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);

  const visible = pastHero && !ctaInView && !formActive;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-[transform,visibility] duration-300 lg:hidden ${
        visible ? "visible translate-y-0" : "pointer-events-none invisible translate-y-full"
      }`}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="mx-auto flex max-w-lg gap-3">
        <ReviewButton lang={lang} source="mobile_bar" className="btn btn-amber min-h-12 flex-1">
          {review}
          <ArrowRight aria-hidden className="size-5" strokeWidth={2.25} />
        </ReviewButton>
        <CallLink location="mobile_bar" className="btn btn-ghost min-h-12 px-5">
          <Phone aria-hidden className="size-5" strokeWidth={2.25} />
          {call}
        </CallLink>
      </div>
    </div>
  );
}
