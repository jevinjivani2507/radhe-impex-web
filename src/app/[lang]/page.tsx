import Link from "next/link";
import { notFound } from "next/navigation";
import { DiamondRing } from "@/components/diamond-ring";
import { EnquiryForm } from "@/components/enquiry-form";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ShapeGrid, type ShapeItem } from "@/components/shape-grid";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { shapeSlugs, site } from "@/lib/site";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  const shapes: ShapeItem[] = shapeSlugs.map((slug) => ({ slug, ...t.shapes.items[slug] }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: site.name,
    url: `${site.url}/${lang}`,
    description: t.meta.description,
    email: site.email,
    inLanguage: lang,
    address: { "@type": "PostalAddress", addressLocality: "Surat", addressCountry: "IN" },
    makesOffer: shapes.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: s.name, description: s.note },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="relative isolate flex min-h-svh flex-col overflow-hidden bg-forest text-paper">
        {/* Phones: ring on the right edge at mid-height, between headline and buttons.
            Desktop: larger, beside the text. */}
        <DiamondRing
          names={t.shapes.items}
          className="absolute top-[calc(50%+2rem)] right-0 -z-10 w-[min(108vw,78svh)] translate-x-1/2 -translate-y-1/2 lg:top-1/2 lg:w-[min(118vh,68vw)] lg:translate-x-[42%]" />

        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-6 sm:justify-start sm:gap-12 sm:py-7 lg:px-10">
          <Link
            href={`/${lang}`}
            className="font-brand text-2xl whitespace-nowrap tracking-[0.12em] sm:text-3xl sm:tracking-[0.18em]"
          >
            {site.name.toUpperCase()}
          </Link>
          <nav className="hidden gap-8 text-sm text-mist sm:flex">
            <a href="#shapes" className="hover:text-paper">
              {t.nav.shapes}
            </a>
            <a href="#enquire" className="hover:text-paper">
              {t.nav.enquire}
            </a>
          </nav>
          <LanguageSwitcher current={lang} label={t.nav.language} />
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pt-2 pb-10 lg:justify-center lg:px-10 lg:pt-0 lg:pb-24">
          <h1 className="max-w-[13ch] font-serif text-[clamp(2.5rem,7vw,5.75rem)] leading-[1.04] font-normal">
            {t.hero.title}
          </h1>
          <p className="mt-7 hidden max-w-[42ch] text-lg leading-relaxed text-mist sm:block">
            {t.hero.body}
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-4 pt-10 lg:mt-10 lg:pt-0">
            <a
              href="#shapes"
              className="rounded-full bg-paper px-8 py-4 font-medium text-forest transition-colors hover:bg-gold"
            >
              {t.hero.primary}
            </a>
            <a
              href="#enquire"
              className="text-mist underline decoration-mist/40 underline-offset-4 hover:text-paper"
            >
              {t.hero.secondary}
            </a>
          </div>
        </div>
      </header>

      <main className="bg-paper">
        <section id="shapes" className="mx-auto max-w-6xl scroll-mt-8 px-6 py-24 lg:py-32">
          <h2 className="text-center font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] leading-tight">
            {t.shapes.title}
          </h2>
          <p className="mx-auto mt-4 mb-16 max-w-[48ch] text-center leading-relaxed text-stone">
            {t.shapes.body}
          </p>
          <ShapeGrid items={shapes} alt={t.shapes.alt} />
        </section>

        <section className="border-t border-ink/10">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-3 lg:py-24">
            {t.facts.map((f) => (
              <div key={f.title}>
                <h3 className="font-serif text-2xl">{f.title}</h3>
                <p className="mt-3 max-w-[36ch] leading-relaxed text-stone">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="enquire" className="bg-forest text-paper">
          <div className="mx-auto max-w-4xl px-6 py-24 lg:py-32">
            <h2 className="font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] leading-tight">
              {t.enquiry.title}
            </h2>
            <p className="mt-4 mb-14 max-w-[48ch] leading-relaxed text-mist">{t.enquiry.body}</p>
            <EnquiryForm t={t.enquiry} shapes={shapes} locale={lang} />
          </div>
        </section>
      </main>

      <footer className="border-t border-paper/10 bg-forest text-mist">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
          <span className="font-brand text-xl tracking-[0.18em] text-paper">
            {site.name.toUpperCase()}
          </span>
          <div className="flex flex-col gap-1 sm:items-end">
            <span>{t.footer.city}</span>
            <a href={`mailto:${site.email}`} className="hover:text-paper">
              {site.email}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
