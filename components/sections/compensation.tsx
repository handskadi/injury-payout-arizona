import { HeartPulse, Hospital, Receipt, Wallet } from "lucide-react";
import type { Dictionary } from "@/dictionaries";
import { Section, SectionHeader } from "@/components/ui/section";

const icons = [Hospital, Wallet, HeartPulse, Receipt];

/** 6 — What compensation may cover: heading above a 2×2 grid (compact rows on mobile), one qualifier below. */
export function Compensation({ dict }: { dict: Dictionary }) {
  const c = dict.compensation;
  return (
    <Section id="compensation" tone="surface" labelledBy="compensation-title">
      <SectionHeader id="compensation-title" title={c.title} lede={c.lede} />
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-5">
        {c.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <li key={item.title} className="flex gap-4 rounded-2xl border border-line bg-white p-4 sm:p-6">
              <Icon aria-hidden className="mt-0.5 size-6 shrink-0 text-blue" strokeWidth={2} />
              <div>
                <h3 className="font-bold text-navy">{item.title}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{item.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-5 text-sm text-muted">{c.qualifier}</p>
    </Section>
  );
}
