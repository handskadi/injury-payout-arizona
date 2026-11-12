"use client";

import type { ReactNode } from "react";
import { CircleAlert } from "lucide-react";

export function describedBy(id: string, hasHint: boolean, hasError: boolean): string | undefined {
  const ids = [hasHint && `${id}-hint`, hasError && `${id}-error`].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

export function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm font-semibold text-danger">
      <CircleAlert aria-hidden className="mt-px size-4 shrink-0" strokeWidth={2.25} />
      <span>{children}</span>
    </p>
  );
}

export function FieldShell({
  id,
  label,
  optional,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.9375rem] font-semibold text-navy">
        {label}
        {optional && (
          <>
            {" "}
            <span className="font-normal text-muted">({optional})</span>
          </>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm leading-snug text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  );
}

export function Checkbox({
  id,
  checked,
  onChange,
  invalid,
  describedBy: described,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  invalid?: boolean;
  describedBy?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="relative mt-0.5 grid size-6 shrink-0 place-items-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={invalid || undefined}
          aria-describedby={described}
          className={`peer size-6 cursor-pointer appearance-none rounded-md border-[1.5px] bg-white transition-colors checked:border-blue checked:bg-blue focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue ${
            invalid ? "border-danger" : "border-line-strong hover:border-navy/50"
          }`}
        />
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute size-4 text-white opacity-0 transition-opacity peer-checked:opacity-100"
          fill="none"
          stroke="currentColor"
          strokeWidth={3.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </span>
      <label htmlFor={id} className="cursor-pointer text-[0.9375rem] leading-snug text-navy">
        {children}
      </label>
    </div>
  );
}
