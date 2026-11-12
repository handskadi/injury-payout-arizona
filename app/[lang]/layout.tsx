import type { Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, locales, localeTag } from "@/lib/i18n";

// The design preview's own font files: Inter (variable) and Barlow Semi Condensed ExtraBold.
const inter = localFont({
  src: "../fonts/inter-variable.woff",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});
const barlow = localFont({
  src: "../fonts/barlow-extra-bold.woff",
  weight: "800",
  variable: "--font-barlow",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#102B46",
  width: "device-width",
  initialScale: 1,
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={localeTag[lang]} className={`${inter.variable} ${barlow.variable}`}>
      <body>{children}</body>
    </html>
  );
}
