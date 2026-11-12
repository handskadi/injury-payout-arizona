import type { Localized } from "./types";

/**
 * Approved settlement examples (Final developer brief, 08 Nov 2026, p.05).
 * These are settlement amounts — never label them as money received by the
 * client, an average or a typical payout. `detail` is one factual case detail
 * and stays null unless it has been verified. Approval and source records are
 * kept privately, outside this repository.
 */
export type CaseResult = {
  id: string;
  amount: Localized;
  caseType: Localized;
  detail: Localized | null;
};

export const results: CaseResult[] = [
  {
    id: "mva-1800000",
    amount: { en: "$1.8M", es: "$1.8 millones" },
    caseType: { en: "Motor vehicle accident", es: "Accidente de tránsito" },
    detail: null,
  },
  {
    id: "medmal-1100000",
    amount: { en: "$1.1M", es: "$1.1 millones" },
    caseType: { en: "Medical malpractice", es: "Negligencia médica" },
    detail: null,
  },
  {
    id: "product-200000",
    amount: { en: "$200K", es: "$200,000" },
    caseType: { en: "Product liability", es: "Lesiones por un producto defectuoso" },
    detail: null,
  },
];
