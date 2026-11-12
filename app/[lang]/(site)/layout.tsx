import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { LangSync } from "@/components/client/lang-sync";
import { NavTracker } from "@/components/client/nav-tracker";
import "./site.css";

/** The site: homepage (step 1 in the hero), form pages under /form, policy pages. */
export default async function SiteLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  return (
    <div className="min-h-dvh">
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-navy px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {dict.common.skip}
      </a>
      <LangSync lang={lang} />
      <NavTracker />
      {children}
    </div>
  );
}
