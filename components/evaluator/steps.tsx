"use client";

import { useEffect, useId, useMemo, useRef, type FormEvent } from "react";
import { ArrowRight, Check, ChevronLeft, CircleAlert, LoaderCircle, MapPin, RotateCcw } from "lucide-react";
import { enabledCategories, type CategoryId } from "@/content/categories";
import { evaluatorRules } from "@/content/rules";
import type { Dictionary } from "@/dictionaries";
import { fmt } from "@/lib/format";
import { localePath, localeTag, type Locale } from "@/lib/i18n";
import { evaluator, useEvaluator, type EvaluatorState } from "@/lib/evaluator/store";
import { formatAsYouType } from "@/lib/evaluator/phone";
import { currentMonthIndex } from "@/lib/evaluator/validate";
import { keepInView } from "@/lib/evaluator/reveal";
import { lookupZip } from "@/lib/evaluator/zip-lookup";
import type { ErrorCode, Field } from "@/lib/evaluator/types";
import { categoryIcons } from "./category-icons";
import { Checkbox, ErrorText, FieldShell, describedBy } from "./fields";

export type EvalText = Dictionary["evaluator"];
export type CategoryText = Dictionary["categories"];

type ViewProps = {
  t: EvalText;
  cats: CategoryText;
  lang: Locale;
  /** This view is the one the person is using (drives focus management). */
  active: boolean;
  /** "card" = hero card on the homepage, "page" = form page (/form/…). */
  variant: "card" | "page";
  /** The hero card shows only step 1; later steps continue on the form pages. */
  firstStepOnly?: boolean;
  /** Step to show (form pages pass the step from the URL). */
  step?: 1 | 2 | 3;
  /** Hero card: called after step 1 is valid, to move on to the form page. */
  onAdvance?: () => void;
};

export function Progress({ step, t }: { step: number; t: EvalText }) {
  return (
    <div className="flex items-center gap-3">
      <p className="shrink-0 text-sm font-semibold text-muted" aria-live="polite">
        {fmt(t.stepOf, { n: step })}
      </p>
      <div className="flex flex-1 gap-1.5" aria-hidden>
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${n <= step ? "bg-blue" : "bg-navy/10"}`}
          />
        ))}
      </div>
    </div>
  );
}

export function StepView(props: ViewProps) {
  const { active, variant, firstStepOnly, step } = props;
  const s = useEvaluator();
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const view = s.phase === "done" ? "done" : firstStepOnly ? 1 : (step ?? s.step);

  // Move focus to the step heading on every step change and on arrival at a
  // form page (announces the new step).
  const lastView = useRef(view);
  const mounted = useRef(false);
  useEffect(() => {
    const changed = lastView.current !== view;
    lastView.current = view;
    const firstPageMount = !mounted.current && variant === "page";
    mounted.current = true;
    const el = headingRef.current;
    if (!active || (!changed && !firstPageMount) || !el) return;
    el.focus({ preventScroll: true });
    if (variant === "card") keepInView(el);
  }, [view, active, variant]);

  // After a blocked Continue, focus the first invalid field.
  const lastToken = useRef(s.focusToken);
  useEffect(() => {
    if (s.focusToken === lastToken.current) return;
    lastToken.current = s.focusToken;
    if (!active) return;
    requestAnimationFrame(() => {
      rootRef.current
        ?.querySelector<HTMLElement>(
          'input[data-invalid="true"], input[aria-invalid="true"], select[aria-invalid="true"], textarea[aria-invalid="true"]',
        )
        ?.focus();
    });
  }, [s.focusToken, active]);

  return (
    <div ref={rootRef}>
      <div
        key={String(view)}
        className="animate-step-in"
        style={{ ["--step-dir" as string]: s.direction === 1 ? "14px" : "-14px" }}
      >
        {view === 1 && <StepOne {...props} s={s} headingRef={headingRef} />}
        {view === 2 && <StepTwo {...props} s={s} headingRef={headingRef} />}
        {view === 3 && <StepThree {...props} s={s} headingRef={headingRef} />}
        {view === "done" && <Done {...props} s={s} headingRef={headingRef} />}
      </div>
    </div>
  );
}

type StepProps = ViewProps & { s: EvaluatorState; headingRef: React.RefObject<HTMLHeadingElement | null> };

const errorText = (t: EvalText, code: ErrorCode | undefined) =>
  code ? fmt(t.errors[code], { max: evaluatorRules.descriptionMaxLength }) : undefined;

function submitHandler(fn: () => void) {
  return (e: FormEvent) => {
    e.preventDefault();
    fn();
  };
}

/* ───────────────────────── Step 1 — accident type ───────────────────────── */

function StepOne({ t, cats, s, headingRef, variant, firstStepOnly, onAdvance }: StepProps) {
  const uid = useId();
  const error = errorText(t, s.errors.category);
  const odd = enabledCategories.length % 2 === 1;
  const resuming = firstStepOnly && s.step > 1;

  const onContinue = () => {
    if (resuming) return onAdvance?.();
    if (evaluator.next() && firstStepOnly) onAdvance?.();
  };

  return (
    <form onSubmit={submitHandler(onContinue)} noValidate>
      <div
        role="radiogroup"
        aria-labelledby={`${uid}-q`}
        aria-describedby={describedBy(uid, true, !!error)}
        aria-required
        aria-invalid={error ? true : undefined}
      >
        <h3
          id={`${uid}-q`}
          ref={headingRef}
          tabIndex={-1}
          data-step-heading
          className={`font-bold text-navy outline-none ${variant === "page" ? "text-2xl" : "text-lg"}`}
        >
          {t.step1.legend}
        </h3>
        <p id={`${uid}-hint`} className="mt-1 text-sm text-muted">
          {t.step1.hint}
        </p>
        <div className="mt-3.5 grid grid-cols-1 gap-2 min-[360px]:grid-cols-2 sm:mt-4 sm:gap-2.5">
          {enabledCategories.map((id, i) => (
            <CategoryTile
              key={id}
              id={id}
              name={`${uid}-category`}
              label={cats[id].label}
              checked={s.values.category === id}
              invalid={!!error}
              wide={odd && i === enabledCategories.length - 1}
            />
          ))}
        </div>
        {error && <ErrorText id={`${uid}-error`}>{error}</ErrorText>}
      </div>
      <button type="submit" name="step1-continue" className="btn btn-amber mt-5 w-full">
        {t.actions.continue}
        <ArrowRight aria-hidden className="size-5" strokeWidth={2.25} />
      </button>
    </form>
  );
}

function CategoryTile({
  id,
  name,
  label,
  checked,
  invalid,
  wide,
}: {
  id: CategoryId;
  name: string;
  label: string;
  checked: boolean;
  invalid: boolean;
  wide: boolean;
}) {
  const Icon = categoryIcons[id];
  return (
    <label
      className={`relative flex min-h-14 cursor-pointer items-center gap-2.5 rounded-xl border-[1.5px] bg-white py-2 pr-2.5 pl-2 sm:min-h-[3.75rem] sm:gap-3 sm:py-2.5 sm:pr-3 sm:pl-2.5 transition-[border-color,box-shadow] duration-150 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue ${
        checked
          ? "border-blue shadow-[inset_0_0_0_1px_var(--color-blue)]"
          : invalid
            ? "border-danger/70 hover:border-danger"
            : "border-line-strong hover:border-navy/50"
      } ${wide ? "min-[360px]:col-span-2" : ""}`}
    >
      <input
        type="radio"
        name={name}
        value={id}
        checked={checked}
        onChange={() => evaluator.choose(id)}
        data-invalid={invalid || undefined}
        className="sr-only"
      />
      <span
        aria-hidden
        className={`grid size-9 shrink-0 place-items-center rounded-lg transition-colors duration-150 sm:size-10 ${
          checked ? "bg-blue text-white" : "bg-surface text-navy"
        }`}
      >
        <Icon className="size-5" strokeWidth={2} />
      </span>
      <span className="min-w-0 flex-1 text-[0.9375rem] leading-tight font-semibold text-navy">{label}</span>
      <span
        aria-hidden
        className={`hidden size-5 shrink-0 place-items-center rounded-full border-[1.5px] transition-colors duration-150 min-[420px]:grid ${
          checked ? "border-blue bg-blue text-white" : "border-line-strong text-transparent"
        }`}
      >
        <Check className="size-3" strokeWidth={3.5} />
      </span>
    </label>
  );
}

/* ───────────────────────── Shared bits ───────────────────────── */

function StepHeading({
  headingRef,
  children,
  variant,
}: {
  headingRef: StepProps["headingRef"];
  children: string;
  variant: ViewProps["variant"];
}) {
  return (
    <h3
      ref={headingRef}
      tabIndex={-1}
      data-step-heading
      className={`font-bold text-navy outline-none ${variant === "page" ? "text-2xl" : "text-lg"}`}
    >
      {children}
    </h3>
  );
}

function Actions({
  t,
  step,
  submitLabel,
  busy,
  locked,
}: {
  t: EvalText;
  step: 2 | 3;
  submitLabel: string;
  busy?: boolean;
  /** Step 3 until the agreement box is checked: greyed out and not clickable. */
  locked?: boolean;
}) {
  return (
    <div className="mt-5 flex items-stretch gap-3">
      <button
        type="button"
        name={`step${step}-back`}
        className="btn btn-ghost shrink-0 px-4"
        onClick={() => evaluator.back()}
        disabled={busy}
      >
        <ChevronLeft aria-hidden className="-ml-1 size-5" strokeWidth={2.25} />
        {t.actions.back}
      </button>
      <button
        type="submit"
        name={step === 3 ? "step3-submit" : `step${step}-continue`}
        className={`btn min-w-0 flex-1 ${locked && !busy ? "cursor-not-allowed! bg-navy/10 text-navy/50 opacity-100!" : "btn-amber"}`}
        disabled={busy || locked}
        aria-busy={busy || undefined}
      >
        {busy ? (
          <>
            <LoaderCircle aria-hidden className="size-5 animate-spin" strokeWidth={2.25} />
            {t.actions.submitting}
          </>
        ) : (
          <>
            {submitLabel}
            <ArrowRight aria-hidden className="size-5 shrink-0" strokeWidth={2.25} />
          </>
        )}
      </button>
    </div>
  );
}

const inputProps = (id: string, field: Field, s: EvaluatorState, hasHint: boolean) => ({
  id,
  "aria-invalid": s.errors[field] ? (true as const) : undefined,
  "aria-describedby": describedBy(id, hasHint, !!s.errors[field]),
  onBlur: () => evaluator.blur(field),
});

/* ───────────────────────── Step 2 — incident basics ───────────────────────── */

function StepTwo(props: StepProps) {
  const { t, s, lang, headingRef, variant } = props;
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const tag = localeTag[lang];

  const { months, years, nowIndex } = useMemo(() => {
    const now = new Date();
    const fmtMonth = new Intl.DateTimeFormat(tag, { month: "long" });
    const year = now.getFullYear();
    return {
      nowIndex: currentMonthIndex(now),
      months: Array.from({ length: 12 }, (_, i) => {
        const name = fmtMonth.format(new Date(2000, i, 1));
        return { value: String(i + 1), label: name.charAt(0).toUpperCase() + name.slice(1) };
      }),
      years: Array.from({ length: evaluatorRules.incidentYearsBack + 1 }, (_, i) => String(year - i)),
    };
  }, [tag]);

  const v = s.values;
  const selectedYear = Number(v.year);

  const dateError = errorText(t, s.errors.month) ?? errorText(t, s.errors.year);
  const dateErrorId = id("date-error");

  return (
    <form onSubmit={submitHandler(() => evaluator.next())} noValidate>
      <StepHeading headingRef={headingRef} variant={variant}>
        {t.step2.title}
      </StepHeading>

      <div className="mt-4 space-y-5">
        <fieldset>
          <legend id={id("date-legend")} className="block text-[0.9375rem] font-semibold text-navy">
            {t.step2.date.legend}
          </legend>
          <div className="mt-2 grid grid-cols-[1.35fr_1fr] gap-3">
            <div>
              <select
                id={id("month")}
                aria-labelledby={id("date-legend")}
                name="incident-month"
                value={v.month}
                disabled={v.dateUnknown}
                aria-invalid={s.errors.month ? true : undefined}
                aria-describedby={s.errors.month ? dateErrorId : undefined}
                onChange={(e) => evaluator.update("month", e.target.value)}
                className="field-input"
              >
                <option value="" />
                {months.map((m) => (
                  <option
                    key={m.value}
                    value={m.value}
                    disabled={!!selectedYear && selectedYear * 12 + Number(m.value) > nowIndex}
                  >
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                id={id("year")}
                aria-labelledby={id("date-legend")}
                name="incident-year"
                value={v.year}
                disabled={v.dateUnknown}
                aria-invalid={s.errors.year ? true : undefined}
                aria-describedby={s.errors.year ? dateErrorId : undefined}
                onChange={(e) => evaluator.update("year", e.target.value)}
                className="field-input tabular-nums"
              >
                <option value="" />
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {dateError && <ErrorText id={dateErrorId}>{dateError}</ErrorText>}
          <div className="mt-3.5">
            <Checkbox id={id("unknown")} checked={v.dateUnknown} onChange={(c) => evaluator.update("dateUnknown", c)}>
              {t.step2.date.unknown}
            </Checkbox>
          </div>
        </fieldset>

        <FieldShell
          id={id("desc")}
          label={t.step2.description.label}
          optional={t.step2.description.optional}
          error={errorText(t, s.errors.description)}
        >
          <textarea
            {...inputProps(id("desc"), "description", s, false)}
            name="incident-description"
            rows={3}
            maxLength={evaluatorRules.descriptionMaxLength}
            value={v.description}
            onChange={(e) => evaluator.update("description", e.target.value)}
            className="field-input min-h-[6.5rem] resize-y"
          />
        </FieldShell>
      </div>

      <Actions t={t} step={2} submitLabel={t.actions.continue} />
    </form>
  );
}

/* ───────────────────────── Home address (step 3) ───────────────────────── */

/**
 * The client's home ZIP code (Josh, 11 Nov 2026). A valid ZIP looks up its
 * city and state; the street address follows, with "Enter address manually
 * instead" for editable city and state fields.
 */
function HomeAddress({ t, s, id }: { t: EvalText; s: EvaluatorState; id: (f: string) => string }) {
  const v = s.values;
  const zipReady = /^\d{5}(-\d{4})?$/.test(v.zip.trim());
  const zip5 = v.zip.trim().slice(0, 5);
  useEffect(() => {
    if (!zipReady) return;
    let current = true;
    void lookupZip(zip5).then((place) => {
      if (current && place) evaluator.applyPlace(zip5, place);
    });
    return () => {
      current = false;
    };
  }, [zipReady, zip5]);
  const showPlace = zipReady && !v.addressManual && !!v.city && !!v.state;
  const showAddress = zipReady || v.addressManual;

  return (
    <div>
      <FieldShell id={id("zip")} label={t.step3.zip.label} error={errorText(t, s.errors.zip)}>
        <div className="relative max-w-[11rem]">
          <input
            {...inputProps(id("zip"), "zip", s, false)}
            type="text"
            name="postal-code"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={10}
            value={v.zip}
            onChange={(e) => evaluator.update("zip", e.target.value.replace(/[^\d-]/g, ""))}
            className="field-input w-full pr-10 tabular-nums"
          />
          {showPlace && (
            <MapPin aria-hidden className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-blue" strokeWidth={2.25} />
          )}
        </div>
      </FieldShell>
      {showPlace && (
        <p className="mt-3 inline-flex items-center gap-2 rounded-xl border-[1.5px] border-line bg-surface px-3.5 py-2.5 font-semibold text-navy" aria-live="polite">
          <MapPin aria-hidden className="size-4 shrink-0 text-blue" strokeWidth={2.25} />
          {v.city}, {v.state}
        </p>
      )}
      {showAddress && (
        <div className="mt-4 space-y-3">
          <FieldShell id={id("street")} label={t.step3.address.street}>
            <input
              id={id("street")}
              type="text"
              name="street-address"
              autoComplete="address-line1"
              maxLength={120}
              placeholder={t.step3.address.placeholder}
              value={v.streetAddress}
              onChange={(e) => evaluator.update("streetAddress", e.target.value)}
              className="field-input"
            />
          </FieldShell>
          {v.addressManual ? (
            <div className="grid grid-cols-2 gap-3">
              <FieldShell id={id("city")} label={t.step3.address.city}>
                <input
                  id={id("city")}
                  type="text"
                  name="city"
                  autoComplete="address-level2"
                  maxLength={60}
                  value={v.city}
                  onChange={(e) => evaluator.update("city", e.target.value)}
                  className="field-input"
                />
              </FieldShell>
              <FieldShell id={id("state")} label={t.step3.address.state}>
                <input
                  id={id("state")}
                  type="text"
                  name="state"
                  autoComplete="address-level1"
                  maxLength={40}
                  value={v.state}
                  onChange={(e) => evaluator.update("state", e.target.value)}
                  className="field-input"
                />
              </FieldShell>
            </div>
          ) : (
            <button
              type="button"
              name="address-manual"
              onClick={() => evaluator.setAddressManual()}
              className="text-sm text-muted underline underline-offset-2 transition-colors hover:text-navy"
            >
              {t.step3.address.manual}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── Step 3 — contact ───────────────────────── */

function StepThree(props: StepProps) {
  const { t, s, lang, headingRef, variant } = props;
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const v = s.values;
  const busy = s.phase === "submitting";
  const failed = s.phase === "failed";

  return (
    <form onSubmit={submitHandler(() => evaluator.next())} noValidate>
      <StepHeading headingRef={headingRef} variant={variant}>
        {t.step3.title}
      </StepHeading>

      <div className="mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 sm:items-start">
          <FieldShell id={id("first")} label={t.step3.firstName} error={errorText(t, s.errors.firstName)}>
            <input
              {...inputProps(id("first"), "firstName", s, false)}
              type="text"
              name="given-name"
              autoComplete="given-name"
              autoCapitalize="words"
              maxLength={evaluatorRules.nameMaxLength}
              value={v.firstName}
              onChange={(e) => evaluator.update("firstName", e.target.value)}
              className="field-input"
            />
          </FieldShell>
          <FieldShell id={id("last")} label={t.step3.lastName} error={errorText(t, s.errors.lastName)}>
            <input
              {...inputProps(id("last"), "lastName", s, false)}
              type="text"
              name="family-name"
              autoComplete="family-name"
              autoCapitalize="words"
              maxLength={evaluatorRules.nameMaxLength}
              value={v.lastName}
              onChange={(e) => evaluator.update("lastName", e.target.value)}
              className="field-input"
            />
          </FieldShell>

          <FieldShell id={id("phone")} label={t.step3.phone.label} error={errorText(t, s.errors.phone)}>
            <input
              {...inputProps(id("phone"), "phone", s, false)}
              type="tel"
              name="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={20}
              value={v.phone}
              onChange={(e) => {
                const el = e.target;
                const atEnd = el.selectionStart === el.value.length;
                evaluator.update("phone", atEnd ? formatAsYouType(el.value) : el.value);
              }}
              className="field-input tabular-nums"
            />
          </FieldShell>

          <FieldShell id={id("email")} label={t.step3.email} error={errorText(t, s.errors.email)}>
            <input
              {...inputProps(id("email"), "email", s, false)}
              type="email"
              name="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              maxLength={evaluatorRules.emailMaxLength}
              value={v.email}
              onChange={(e) => evaluator.update("email", e.target.value)}
              className="field-input"
            />
          </FieldShell>
        </div>

        <HomeAddress t={t} s={s} id={id} />

        {/* Honeypot: hidden from people and assistive tech. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={v.website}
              onChange={(e) => evaluator.setHoneypot(e.target.value)}
            />
          </label>
        </div>

        {/* Communications consent goes here once the firm supplies approved EN/ES wording (brief p.15). */}

        <Checkbox id={id("consent")} checked={v.consent} onChange={(c) => evaluator.update("consent", c)}>
          <span className="text-sm text-muted">
            {t.step3.noticeBefore}
            <a
              href={localePath(lang, "/privacy")}
              target="_blank"
              rel="noopener"
              className="font-semibold text-blue underline underline-offset-2"
            >
              {t.step3.noticeLink}
            </a>
            {t.step3.noticeAfter}
          </span>
        </Checkbox>
      </div>

      {failed && (
        <p role="alert" className="mt-5 flex items-start gap-2 rounded-xl border-[1.5px] border-danger/40 bg-white p-4 font-semibold text-danger">
          <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0" strokeWidth={2.25} />
          {t.failure}
        </p>
      )}

      <Actions t={t} step={3} busy={busy} locked={!v.consent} submitLabel={t.actions.submitLive} />
    </form>
  );
}

/* ───────────────────────── Done ───────────────────────── */

function Done({ t, headingRef, variant, firstStepOnly }: StepProps) {
  // Homepage hero after a completed review: a short note and a fresh start.
  if (firstStepOnly) {
    return (
      <div className="flex items-center justify-between gap-4 py-2">
        <p ref={headingRef} tabIndex={-1} className="flex items-center gap-2.5 font-semibold text-navy outline-none">
          <span className="grid size-8 place-items-center rounded-full bg-amber text-navy">
            <Check aria-hidden className="size-4" strokeWidth={3} />
          </span>
          {t.heroDone}
        </p>
        <button
          type="button"
          className="btn btn-ghost min-h-11 shrink-0 px-3.5 text-sm"
          onClick={() => evaluator.reset()}
        >
          <RotateCcw aria-hidden className="size-4" />
          {t.actions.startOver}
        </button>
      </div>
    );
  }

  return (
    <div className={`text-center ${variant === "page" ? "pt-4" : "py-2"}`}>
      <span className="mx-auto grid size-14 place-items-center rounded-full bg-amber text-navy">
        <Check aria-hidden className="size-7" strokeWidth={3} />
      </span>
      <h3
        ref={headingRef}
        tabIndex={-1}
        data-step-heading
        className="display mt-5 text-[1.75rem] text-navy outline-none sm:text-[2rem]"
      >
        {t.liveDone.title}
      </h3>
      <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted">
        {t.liveDone.body}
      </p>
    </div>
  );
}
