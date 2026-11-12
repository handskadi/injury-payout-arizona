"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { counterpartPath, localeTag } from "@/lib/i18n";
import { track } from "@/lib/analytics";

/**
 * Soft navigation to the same page in the other language. `replace` +
 * `scroll={false}` keep the reader where they were; the evaluator's
 * in-memory state carries across untouched.
 */
export function LanguageSwitch({
  label,
  className = "",
  tone = "light",
}: {
  label: string;
  className?: string;
  tone?: "light" | "navy";
}) {
  const pathname = usePathname();
  const target = counterpartPath(pathname);
  const toneClass =
    tone === "navy"
      ? "text-white border-white/30 hover:border-white"
      : "text-navy border-line-strong hover:border-navy";
  return (
    <Link
      href={target.href}
      hrefLang={localeTag[target.lang]}
      lang={localeTag[target.lang]}
      replace
      scroll={false}
      prefetch
      onClick={() => track({ name: "language_change", to: target.lang })}
      className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border-[1.5px] px-3 text-sm font-semibold transition-colors ${toneClass} ${className}`}
    >
      <Globe aria-hidden className="size-4" strokeWidth={2} />
      {label}
    </Link>
  );
}
