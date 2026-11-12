import type { MetadataRoute } from "next";
import { isReview, siteUrl } from "@/content/site";

// Link-preview bots may read pages so shared links show the title and image;
// search engines stay out while the site is in review (pages are noindex too).
const previewBots = ["facebookexternalhit", "Facebot", "WhatsApp", "Twitterbot", "LinkedInBot", "Slackbot", "TelegramBot", "Discordbot"];

export default function robots(): MetadataRoute.Robots {
  if (isReview)
    return {
      rules: [
        { userAgent: previewBots, allow: "/" },
        { userAgent: "*", disallow: "/" },
      ],
    };
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: `${siteUrl}/sitemap.xml` };
}
