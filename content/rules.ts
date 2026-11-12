/** Editable evaluator rules (brief p.04: keep date and category rules editable). */
export const evaluatorRules = {
  /** How many calendar years back the incident-year picker offers. */
  incidentYearsBack: 10,
  descriptionMaxLength: 600,
  nameMaxLength: 60,
  emailMaxLength: 254,
  /**
   * Version of the step-3 agreement wording (Josh's review, item 10, 11 Nov
   * 2026). Stored with every lead; change it whenever that wording changes.
   * null = live submission is refused.
   */
  consentVersion: "2026-11-11" as string | null,
};
