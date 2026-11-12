"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";
import { evaluator } from "@/lib/evaluator/store";
import { captureAttribution } from "@/lib/attribution";

export function LangSync({ lang }: { lang: Locale }) {
  useEffect(() => {
    captureAttribution();
    evaluator.setLanguage(lang);
  }, [lang]);
  return null;
}
