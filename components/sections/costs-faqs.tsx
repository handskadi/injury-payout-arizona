import { Plus } from "lucide-react";
import type { Dictionary } from "@/dictionaries";
import { Section, SectionHeader } from "@/components/ui/section";

/**
 * 7 — Costs and FAQs: one readable accordion column, cost answer open by
 * default, several answers can be open at once. Native <details> gives the
 * whole-row tap target, keyboard support and the expanded state.
 */
export function CostsAndFaqs({ dict }: { dict: Dictionary }) {
  const f = dict.faq;
  return (
    <Section id="faqs" labelledBy="faq-title">
      <SectionHeader id="faq-title" title={f.title} />
      <ul className="mt-8 max-w-3xl divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
        {f.items.map((item, i) => (
          <li key={item.q}>
            <details className="group" open={i === 0}>
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-bold text-navy transition-colors hover:bg-surface [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus
                  aria-hidden
                  className="size-5 shrink-0 text-blue transition-transform duration-200 group-open:rotate-45"
                  strokeWidth={2.5}
                />
              </summary>
              <div className="space-y-3 px-5 pb-5 leading-relaxed text-muted">
                {item.a.split("\n\n").map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </details>
          </li>
        ))}
      </ul>
    </Section>
  );
}
