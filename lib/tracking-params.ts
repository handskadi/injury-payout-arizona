/** Shared by the browser capture and the server. Named campaign / click-ID parameters, stored as their own columns. */
export const TRACKED_PARAMS = [
  // UTM
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id",
  "utm_source_platform", "utm_creative_format", "utm_marketing_tactic",
  // Google Ads
  "gclid", "gbraid", "wbraid", "gclsrc", "dclid", "gad_source", "gad_campaignid",
  // Meta
  "fbclid",
  // Microsoft, TikTok, X, LinkedIn, Snapchat, Pinterest
  "msclkid", "ttclid", "twclid", "li_fat_id", "sccid", "epik",
  // Common ad-platform URL-template values
  "campaign_id", "adset_id", "adgroup_id", "ad_id", "keyword", "matchtype", "network", "placement", "creative",
] as const;
