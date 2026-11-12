"use client";

import type { ReactNode } from "react";
import { phone } from "@/content/site";
import { track } from "@/lib/analytics";

/** Every call link on the site; the number comes from one placeholder constant. */
export function CallLink({
  location,
  className,
  children,
  ariaLabel,
}: {
  location: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  return (
    <a
      href={`tel:${phone.tel}`}
      className={className}
      aria-label={ariaLabel}
      data-placeholder-phone={phone.isPlaceholder ? "true" : undefined}
      onClick={() => track({ name: "call_cta_clicked", location })}
    >
      {children}
    </a>
  );
}
