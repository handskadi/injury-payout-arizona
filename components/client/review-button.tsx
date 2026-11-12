"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { CategoryId } from "@/content/categories";
import type { CtaSource } from "@/lib/analytics";
import { formPath, type Locale } from "@/lib/i18n";
import { evaluator } from "@/lib/evaluator/store";

/**
 * Every review CTA goes to step 1 of the form (/form/1), in the current
 * language. Accident cards pre-select their answer.
 */
export function ReviewButton({
  lang,
  source,
  category,
  className,
  children,
}: {
  lang: Locale;
  source: CtaSource;
  category?: CategoryId;
  className?: string;
  children: ReactNode;
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      name={`cta-${source}${category ? `-${category}` : ""}`}
      className={className}
      onClick={() => {
        evaluator.start({ source, category });
        router.push(formPath(lang, 1));
      }}
    >
      {children}
    </button>
  );
}
