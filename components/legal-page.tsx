import { legalDocs, type LegalDocId } from "@/content/legal";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/** Policy pages: Privacy Policy, Terms of Use, Attorney Advertising & Disclosures (EN/ES). */
export function LegalPage({ dict, lang, doc }: { dict: Dictionary; lang: Locale; doc: LegalDocId }) {
  const p = dict.legalPages;
  const d = legalDocs[lang][doc];
  return (
    <>
      <SiteHeader dict={dict} lang={lang} />
      <main id="main" tabIndex={-1} className="bg-surface outline-none">
        <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <h1 className="display text-[2.5rem] text-navy sm:text-6xl">{p[doc].title}</h1>
          <p className="mt-4 text-sm text-muted">{d.updated}</p>
          <div className="mt-8 space-y-4 text-[1.0625rem] leading-relaxed text-navy">
            {d.intro.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          {d.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="text-xl font-bold text-navy sm:text-2xl">{s.heading}</h2>
              <div className="mt-3 space-y-3 leading-relaxed text-muted">
                {s.body.map((para) => (
                  <p key={para}>{para}</p>
                ))}
                {s.list && (
                  <ul className="list-disc space-y-1.5 pl-5">
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {s.after?.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </section>
          ))}
        </article>
      </main>
      <SiteFooter dict={dict} lang={lang} />
    </>
  );
}
