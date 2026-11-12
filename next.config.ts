import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Off on purpose: with cacheComponents, Next keeps the previous route
  // mounted (hidden via <Activity>), so after a step or EN ⇄ ES change two
  // copies of the form (duplicate ids) would coexist. Form answers live in
  // memory stores instead, and every page here is static anyway.
  cacheComponents: false,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
