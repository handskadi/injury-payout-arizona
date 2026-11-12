import type { Localized, ApprovalState } from "./types";

/**
 * Genuine, permissioned client quotes only. Empty until the firm supplies
 * them — the section and its spacing are hidden while nothing is approved.
 */
export type Testimonial = {
  id: string;
  quote: Localized;
  attribution: string;
  caseType: Localized;
  permission: boolean;
  legalApproval: ApprovalState;
  publish: boolean;
};

export const testimonials: Testimonial[] = [];

export const isTestimonialPublishable = (t: Testimonial) =>
  t.publish && t.permission && t.legalApproval === "approved";
