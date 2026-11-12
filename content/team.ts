import type { Localized } from "./types";

/**
 * Attorney profile (Final developer brief, p.06). Role, spelling, admission and
 * biography to be confirmed by the firm. `photo` is the firm's own portrait
 * (never a screenshot or generated image).
 */
export type Attorney = {
  name: string;
  role: Localized;
  bio: Localized;
  credentials: Localized;
  photo: { src: string; width: number; height: number; alt: Localized } | null;
};

export const attorney: Attorney = {
  name: "Pierré Whyte",
  role: { en: "Trial Attorney", es: "Abogado litigante" },
  bio: {
    en: "Pierré Whyte represents people who have suffered serious injuries. His experience includes motor vehicle accidents, medical malpractice and catastrophic injury cases. His work focuses on pursuing compensation for people harmed by the negligence of others.",
    es: "Pierré Whyte representa a personas que han sufrido lesiones graves. Su experiencia incluye accidentes de tránsito, negligencia médica y lesiones catastróficas. Su trabajo se centra en buscar compensación para personas perjudicadas por la negligencia de terceros.",
  },
  credentials: {
    en: "Admitted to practice law in Arizona.",
    es: "Autorizado para ejercer la abogacía en Arizona.",
  },
  // Josh, 11 Nov 2026: the firm's own portrait from goatlegal.com (pierre-2.png, 420×500).
  photo: {
    src: "/team/pierre-whyte.webp",
    width: 420,
    height: 500,
    alt: { en: "Pierré Whyte, Trial Attorney", es: "Pierré Whyte, abogado litigante" },
  },
};
