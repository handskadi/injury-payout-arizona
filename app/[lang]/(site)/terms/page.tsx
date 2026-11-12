import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/legal-page";

export async function generateMetadata({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return buildMetadata({ lang, path: "/terms", title: `${dict.legalPages.terms.title} — Injury Payout`, description: dict.meta.description, noindex: true });
}

export default async function Page({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <LegalPage dict={getDictionary(lang)} lang={lang} doc="terms" />;
}
