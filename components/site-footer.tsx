import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { firm } from "@/content/firm";
import { phone } from "@/content/site";
import type { Dictionary } from "@/dictionaries";
import { fmt } from "@/lib/format";
import { homePath, localePath, type Locale } from "@/lib/i18n";
import { CallLink } from "./client/call-link";
import { LanguageSwitch } from "./client/language-switch";

/**
 * 9 — Footer: brand/description; firm/contact; policies/language. Then a
 * divider, the visible legal notice and copyright. Extra bottom space on
 * mobile so the last lines scroll clear of the mobile action bar.
 */
export function SiteFooter({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const f = dict.footer;
  return (
    <footer id="site-footer" className="on-navy bg-navy-deep text-white/75">
      <div className="page-wrap pt-8 pb-[calc(6.5rem+env(safe-area-inset-bottom))] lg:pt-12 lg:pb-12">
        <div className="grid gap-6 md:grid-cols-3 md:gap-10">
          <div>
            <Link href={homePath(lang)} className="inline-block rounded-sm">
              <Image
                src="/brand/injury-payout-wordmark-white.svg"
                alt="Injury Payout"
                width={873}
                height={135}
                unoptimized
                className="h-6 w-auto"
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">{f.tagline}</p>
          </div>

          <div>
            <p className="text-sm leading-relaxed">{f.connect}</p>
            <p className="mt-1 text-sm font-semibold text-white">{fmt(f.participatingFirm, { firm: firm.entity })}</p>
            <CallLink
              location="footer"
              className="mt-2 inline-flex min-h-11 items-center gap-2 text-base font-bold text-white tabular-nums hover:text-amber"
            >
              <Phone aria-hidden className="size-4" strokeWidth={2.25} />
              {phone.display}
            </CallLink>
          </div>

          <div>
            <ul className="space-y-1 text-sm">
              {(["privacy", "terms", "disclaimer"] as const).map((key) => (
                <li key={key}>
                  <Link
                    href={localePath(lang, `/${key}`)}
                    className="inline-flex min-h-9 items-center underline-offset-2 hover:text-white hover:underline"
                  >
                    {f.links[key]}
                  </Link>
                </li>
              ))}
            </ul>
            <LanguageSwitch label={dict.common.langName} tone="navy" className="mt-4" />
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-6 text-xs leading-relaxed text-white/65 lg:mt-10">
          <p className="max-w-4xl">{f.operator}</p>
          <p className="mt-1 max-w-4xl">{f.marketingEntity}</p>
          <p className="max-w-4xl">{f.lawFirm}</p>
          <p className="mt-3 max-w-4xl">{f.legal}</p>
          <p className="mt-4">{fmt(f.copyright, { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}
