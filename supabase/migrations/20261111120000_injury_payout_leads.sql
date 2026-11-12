-- Injury Payout lead store. Written only by the website's server (/api/enquiry,
-- secret key). Row level security is on with no policies, so the browser key
-- can neither read nor write either table.

-- 1. One row per submitted inquiry: the form answers.
create table if not exists public.injury_payout_leads (
  id                     uuid primary key default gen_random_uuid(),
  enquiry_id             text not null unique,
  idempotency_key        text not null unique,
  created_at             timestamptz not null default now(),
  preferred_language     text not null check (preferred_language in ('en', 'es')),
  category               text not null,
  zip                    text not null,
  incident_date_unknown  boolean not null default false,
  incident_month         smallint check (incident_month between 1 and 12),
  incident_year          smallint,
  description            text,
  first_name             text not null,
  last_name              text not null,
  phone_e164             text not null,
  email                  text not null,
  consent                boolean not null,
  consent_version        text not null,
  consent_text           text not null
);
create index if not exists injury_payout_leads_created_at_idx on public.injury_payout_leads (created_at desc);
alter table public.injury_payout_leads enable row level security;

-- 2. One tracking row per lead (lead_id → injury_payout_leads.id).
create table if not exists public.injury_payout_lead_tracking (
  id                     uuid primary key default gen_random_uuid(),
  lead_id                uuid not null unique references public.injury_payout_leads (id) on delete cascade,
  enquiry_id             text not null,
  created_at             timestamptz not null default now(),

  -- Visitor
  device_id              text,
  session_id             text,
  session_started_at     timestamptz,
  form_started_at        timestamptz,
  form_duration_seconds  integer,

  -- Network and approximate location (from the IP, via Vercel)
  ip_address             text,
  ip_country             text,
  ip_region              text,
  ip_city                text,
  ip_postal_code         text,
  ip_latitude            double precision,
  ip_longitude           double precision,
  ip_timezone            text,

  -- Browser and device
  user_agent             text,
  browser_name           text,
  browser_version        text,
  os_name                text,
  os_version             text,
  device_type            text,
  ua_platform            text,
  ua_mobile              boolean,
  ua_brands              text,
  accept_language        text,
  browser_language       text,
  browser_languages      text,
  timezone               text,
  timezone_offset_min    integer,
  screen_width           integer,
  screen_height          integer,
  viewport_width         integer,
  viewport_height        integer,
  pixel_ratio            real,
  color_depth            integer,
  touch_points           integer,
  hardware_concurrency   integer,
  device_memory_gb       real,
  connection_type        text,
  cookies_enabled        boolean,
  do_not_track           text,

  -- This session (last touch)
  landing_url            text,
  landing_path           text,
  referrer_url           text,
  referrer_host          text,
  last_touch_at          timestamptz,
  submit_url             text,
  utm_source             text,
  utm_medium             text,
  utm_campaign           text,
  utm_term               text,
  utm_content            text,
  utm_id                 text,
  utm_source_platform    text,
  utm_creative_format    text,
  utm_marketing_tactic   text,
  gclid                  text,
  gbraid                 text,
  wbraid                 text,
  gclsrc                 text,
  dclid                  text,
  gad_source             text,
  gad_campaignid         text,
  fbclid                 text,
  msclkid                text,
  ttclid                 text,
  twclid                 text,
  li_fat_id              text,
  sccid                  text,
  epik                   text,
  campaign_id            text,
  adset_id               text,
  adgroup_id             text,
  ad_id                  text,
  keyword                text,
  matchtype              text,
  network                text,
  placement              text,
  creative               text,
  landing_params         jsonb,

  -- Ad-platform cookies (Meta _fbc/_fbp, Google _ga/_gcl_aw/_gcl_au)
  fbc                    text,
  fbp                    text,
  ga_cookie              text,
  gcl_aw                 text,
  gcl_au                 text,

  -- First ever visit on this device (first touch)
  first_touch_at         timestamptz,
  first_landing_url      text,
  first_referrer_url     text,
  first_utm_source       text,
  first_utm_medium       text,
  first_utm_campaign     text,
  first_utm_term         text,
  first_utm_content      text,
  first_gclid            text,
  first_fbclid           text,
  first_msclkid          text,
  first_touch_params     jsonb
);
create index if not exists injury_payout_lead_tracking_device_idx on public.injury_payout_lead_tracking (device_id);
create index if not exists injury_payout_lead_tracking_gclid_idx on public.injury_payout_lead_tracking (gclid) where gclid is not null;
create index if not exists injury_payout_lead_tracking_fbclid_idx on public.injury_payout_lead_tracking (fbclid) where fbclid is not null;
alter table public.injury_payout_lead_tracking enable row level security;
