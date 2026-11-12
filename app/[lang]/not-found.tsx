import Image from "next/image";
import Link from "next/link";
import { lang as rootLang } from "next/root-params";
import { getDictionary } from "@/dictionaries";
import { hasLocale, homePath } from "@/lib/i18n";

/**
 * Self-contained 404 (inline styles only). Importing a design's stylesheet
 * here would make Next preload it on every page of both versions.
 */
export default async function NotFound() {
  const value = await rootLang();
  const lang = value && hasLocale(value) ? value : "en";
  const nf = getDictionary(lang).notFound;
  return (
    <main
      id="main"
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: "48px 18px",
        background: "#F4F4F5",
        color: "#102B46",
        fontFamily: "var(--font-inter), Arial, sans-serif",
      }}
    >
      <title>{`${nf.title} — Injury Payout`}</title>
      <meta name="robots" content="noindex" />
      <div style={{ maxWidth: 560 }}>
        <Image
          src="/brand/injury-payout-wordmark-primary.svg"
          alt="Injury Payout"
          width={873}
          height={135}
          unoptimized
          style={{ height: 26, width: "auto", margin: "0 0 32px", display: "block" }}
        />
        <h1 style={{ fontFamily: "var(--font-barlow), Arial, sans-serif", fontWeight: 800, fontSize: 44, lineHeight: 1.05, margin: "0 0 16px" }}>
          {nf.title}
        </h1>
        <p style={{ color: "#526174", fontSize: 16, lineHeight: 1.6, margin: "0 0 28px" }}>{nf.body}</p>
        <Link
          href={homePath(lang)}
          style={{ display: "inline-flex", minHeight: 52, alignItems: "center", padding: "14px 24px", borderRadius: 8, background: "#FFBE3D", color: "#102B46", fontWeight: 750, textDecoration: "none" }}
        >
          {nf.home}
        </Link>
      </div>
    </main>
  );
}
