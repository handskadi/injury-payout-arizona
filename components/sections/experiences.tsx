import { Quote } from "lucide-react";
import { testimonials, isTestimonialPublishable } from "@/content/testimonials";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";
import { Section, SectionHeader } from "@/components/ui/section";

/** Optional — genuine, approved written quotes only. The whole section is hidden when none exist. */
export function Experiences({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const approved = testimonials.filter(isTestimonialPublishable);
  if (approved.length === 0) return null;
  return (
    <Section id="client-experiences" labelledBy="experiences-title">
      <SectionHeader id="experiences-title" title={dict.experiences.title} />
      <ul className="mt-8 grid gap-5 md:grid-cols-3">
        {approved.map((t) => (
          <li key={t.id} className="rounded-2xl border border-line bg-white p-6 shadow-card">
            <Quote aria-hidden className="size-7 text-amber" />
            <blockquote className="mt-4 text-[0.9375rem] leading-relaxed text-navy">{t.quote[lang]}</blockquote>
            <p className="mt-4 text-sm font-semibold text-navy">
              {t.attribution} <span className="font-normal text-muted">· {t.caseType[lang]}</span>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
