import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { phone } from "@/content/site";
import type { Dictionary } from "@/dictionaries";
import { homePath, type Locale } from "@/lib/i18n";
import { fmt } from "@/lib/format";
import { CallLink } from "./client/call-link";
import { LanguageSwitch } from "./client/language-switch";
import { ReviewButton } from "./client/review-button";

/**
 * Desktop: wordmark, same-page anchors, language switch, phone, Free case review.
 * Mobile: compact wordmark, Español/English switch and an accessible phone action.
 */
export function SiteHeader({
  dict,
  lang,
  home = false,
  focused = false,
}: {
  dict: Dictionary;
  lang: Locale;
  home?: boolean;
  /** Form pages: only the logo, language control and phone. */
  focused?: boolean;
}) {
  const { common, nav } = dict;
  const homeHref = homePath(lang);
  const anchor = (hash: string) => (home ? `#${hash}` : `${homeHref}#${hash}`);
  const callLabel = fmt(common.call, { phone: phone.display });
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-md">
      <div className="page-wrap flex h-16 items-center gap-3 lg:h-[4.5rem]">
        <Link href={homeHref} className="shrink-0 rounded-sm">
          {/* Identity pack: outlined two-tone wordmark (Injury navy, Payout blue). */}
          <Image
            src="/brand/injury-payout-wordmark-primary.svg"
            alt="Injury Payout"
            width={873}
            height={135}
            priority
            unoptimized
            className="h-[1.05rem] w-auto min-[400px]:h-5 sm:h-[1.4rem]"
          />
        </Link>
        {!focused && (
        <nav aria-label={nav.label} className="ml-8 hidden xl:block">
          <ul className="flex gap-6 text-[0.9375rem] font-semibold text-navy/80">
            {[
              ["how-it-works", nav.how],
              ["injury-types", nav.types],
              ["results", nav.results],
              ["faqs", nav.faq],
            ].map(([hash, label]) => (
              <li key={hash}>
                <a href={anchor(hash)} className="rounded-sm whitespace-nowrap transition-colors hover:text-blue">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        )}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <LanguageSwitch label={common.langName} />
          {/* Number in full where there is room; icon-only beside the desktop nav (long Spanish labels). */}
          <CallLink
            location="header"
            className="hidden min-h-11 items-center gap-2 rounded-full px-2 text-[0.9375rem] font-bold whitespace-nowrap text-navy tabular-nums transition-colors hover:text-blue md:inline-flex xl:hidden 2xl:inline-flex"
          >
            <Phone aria-hidden className="size-4" strokeWidth={2.25} />
            {phone.display}
          </CallLink>
          <CallLink
            location="header"
            ariaLabel={callLabel}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-surface text-navy md:hidden xl:grid 2xl:hidden"
          >
            <Phone aria-hidden className="size-5" strokeWidth={2.25} />
          </CallLink>
          {!focused && (
            <ReviewButton
              lang={lang}
              source="header"
              className="btn btn-amber hidden min-h-11 px-4 text-[0.9375rem] whitespace-nowrap sm:inline-flex"
            >
              {common.freeReview}
            </ReviewButton>
          )}
        </div>
      </div>
    </header>
  );
}
