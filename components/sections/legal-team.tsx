import Image from "next/image";
import { IdCard, Landmark, Phone, Scale } from "lucide-react";
import { firm } from "@/content/firm";
import { phone } from "@/content/site";
import { attorney } from "@/content/team";
import type { Dictionary } from "@/dictionaries";
import { fmt } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import { CallLink } from "@/components/client/call-link";
import { Section } from "@/components/ui/section";

/**
 * 3 — Attorney profile, directly after the settlement proof. Desktop: portrait
 * left (~1/3), name, role and biography right; no outer card. Mobile: heading,
 * then a compact portrait beside name and title. The portrait renders only
 * once the original approved photo is supplied.
 */
export function LegalTeam({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const t = dict.team;
  const a = attorney;
  const photo = a.photo;
  return (
    <Section id="attorney" labelledBy="attorney-title">
      <div className={photo ? "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-start lg:gap-14" : ""}>
        {photo && (
          <Image
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt={photo.alt[lang]}
            sizes="(min-width: 1024px) 33vw, 0px"
            className="hidden aspect-[4/5] w-full rounded-2xl object-cover object-top lg:block"
          />
        )}
        <div className="max-w-3xl">
          <h2 id="attorney-title" className="display text-[2rem] sm:text-5xl lg:text-[3.25rem]">
            {t.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-navy sm:text-xl">
            {t.firmIntro.split("{firm}").map((part, i) => (
              <span key={i}>
                {i > 0 && <strong className="font-bold text-blue">{firm.entity}</strong>}
                {part}
              </span>
            ))}
          </p>
          <div className="mt-6 flex items-center gap-4">
            {photo && (
              <Image
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt={photo.alt[lang]}
                sizes="96px"
                className="size-20 shrink-0 rounded-xl object-cover object-top sm:size-24 lg:hidden"
              />
            )}
            <div>
              <h3 className="display text-[1.75rem] text-navy sm:text-[2rem]">{a.name}</h3>
              <p className="mt-1 font-semibold text-muted">{a.role[lang]}</p>
            </div>
          </div>
          <p className="lede mt-5">{a.bio[lang]}</p>
          <p className="mt-4 leading-relaxed text-navy">{t.practical}</p>
          <ul className="mt-6 space-y-2.5 text-[0.9375rem] text-navy">
            <li className="flex items-start gap-2.5">
              <Scale aria-hidden className="mt-0.5 size-4 shrink-0 text-blue" strokeWidth={2.25} />
              {a.credentials[lang]}
            </li>
            <li className="flex items-start gap-2.5">
              <Landmark aria-hidden className="mt-0.5 size-4 shrink-0 text-blue" strokeWidth={2.25} />
              {fmt(dict.common.responsibleFirm, { firm: firm.entity })}
            </li>
            <li className="contact-line flex items-start gap-2.5">
              <IdCard aria-hidden className="mt-0.5 size-4 shrink-0 text-blue" strokeWidth={2.25} />
              {t.contact}
            </li>
          </ul>
          <p className="mt-5 flex flex-wrap items-center gap-x-2 text-navy">
            {dict.common.callPrompt}
            <CallLink location="attorney" className="inline-flex min-h-11 items-center gap-1.5 font-bold text-blue tabular-nums">
              <Phone aria-hidden className="size-4" strokeWidth={2.25} />
              {fmt(dict.common.call, { phone: phone.display })}
            </CallLink>
          </p>
        </div>
      </div>
    </Section>
  );
}
