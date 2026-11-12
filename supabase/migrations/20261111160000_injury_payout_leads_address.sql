-- Optional address from step 2: street (typed), city + state (from the ZIP lookup, or typed in manual mode).
alter table public.injury_payout_leads
  add column if not exists street_address text,
  add column if not exists city text,
  add column if not exists state text;
