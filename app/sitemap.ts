import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

// Only the homepage is indexable; the policy placeholders are noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      alternates: { languages: { "en-US": siteUrl, "es-US": `${siteUrl}/es` } },
    },
    {
      url: `${siteUrl}/es`,
      alternates: { languages: { "en-US": siteUrl, "es-US": `${siteUrl}/es` } },
    },
  ];
}
