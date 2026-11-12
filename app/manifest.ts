import type { MetadataRoute } from "next";

/** Web app manifest with the identity pack's navy app avatar. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Injury Payout",
    short_name: "Injury Payout",
    description: "Free inquiries for people hurt in accidents.",
    start_url: "/",
    display: "browser",
    background_color: "#FFFFFF",
    theme_color: "#102B46",
    icons: [
      { src: "/brand/injury-payout-avatar-navy@1x.png", sizes: "180x180", type: "image/png" },
      { src: "/brand/injury-payout-avatar-navy@2x.png", sizes: "360x360", type: "image/png" },
      { src: "/brand/injury-payout-avatar-navy@3x.png", sizes: "540x540", type: "image/png" },
    ],
  };
}
