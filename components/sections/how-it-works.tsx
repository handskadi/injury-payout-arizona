import type { Dictionary } from "@/dictionaries";
import { Section, SectionHeader } from "@/components/ui/section";

/** 4 — Process + reassurance merged. Navy, white copy, amber numbers; no connecting line or pill note. */
export function HowItWorks({ dict }: { dict: Dictionary }) {
  const h = dict.how;
  return (
    <Section id="how-it-works" tone="navy" labelledBy="how-title">
      <SectionHeader id="how-title" title={h.title} lede={h.intro} tone="navy" />
      <ol className="mt-8 grid gap-5 sm:gap-6 md:mt-12 md:grid-cols-3 md:gap-8">
        {h.steps.map((step, i) => (
          <li key={step} className="flex gap-3 md:block">
            <span className="display grid size-9 shrink-0 place-items-center rounded-full bg-amber text-lg text-navy md:size-12 md:text-2xl">
              {i + 1}
            </span>
            <p className="max-w-sm self-center text-lg font-bold leading-snug text-white md:mt-5 md:text-xl">{step}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
