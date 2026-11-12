import type { ReactNode } from "react";

const tones = {
  white: "bg-white text-navy",
  surface: "bg-surface text-navy",
  navy: "on-navy bg-navy text-white",
};

/** Content-driven section: 48px vertical padding on mobile, 64px tablet, 80px desktop (brief p.03). */
export function Section({
  id,
  tone = "white",
  labelledBy,
  className = "",
  children,
}: {
  id?: string;
  tone?: keyof typeof tones;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${tones[tone]} py-12 sm:py-16 lg:py-20 ${className}`}
    >
      <div className="page-wrap">{children}</div>
    </section>
  );
}

/** Section heading with an optional introduction. No eyebrow labels (brief). */
export function SectionHeader({
  id,
  title,
  lede,
  tone = "light",
  className = "",
  children,
}: {
  id: string;
  title: string;
  lede?: string;
  tone?: "light" | "navy";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <h2 id={id} className="display text-[2rem] sm:text-5xl lg:text-[3.25rem]">
        {title}
      </h2>
      {lede && <p className={`lede mt-4 max-w-2xl ${tone === "navy" ? "text-white/80" : ""}`}>{lede}</p>}
      {children}
    </div>
  );
}
