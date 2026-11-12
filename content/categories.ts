/**
 * Accident categories offered by the evaluator and the "Accident types"
 * section. Editable: set `enabled: false` to withdraw a category the firm
 * does not accept; labels and copy live in the dictionaries.
 * Proposed generic launch set (Final developer brief, p.08) — firm to confirm.
 */
export const categoryIds = ["car", "truck", "work", "fall", "dog", "medical", "other"] as const;
export type CategoryId = (typeof categoryIds)[number];

export const categoryConfig: Record<CategoryId, { enabled: boolean }> = {
  car: { enabled: true },
  truck: { enabled: true },
  work: { enabled: true },
  fall: { enabled: true },
  dog: { enabled: true },
  medical: { enabled: true },
  other: { enabled: true },
};

export const enabledCategories = categoryIds.filter((id) => categoryConfig[id].enabled);

export const isCategoryId = (value: unknown): value is CategoryId =>
  typeof value === "string" && enabledCategories.includes(value as CategoryId);
