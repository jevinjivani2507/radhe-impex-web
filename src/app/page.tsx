import Link from "next/link";
import { DiamondRing } from "@/components/diamond-ring";
import { EnquiryForm } from "@/components/enquiry-form";
import { ShapeGrid } from "@/components/shape-grid";
import { shapes, site } from "@/lib/site";

const facts = [
  {
    title: "A real diamond",
    body: "Grown by CVD from pure carbon. The same crystal, hardness and fire as a mined stone.",
  },
  {
    title: "Graded and certified",
    body: "Every stone comes with an independent grading report you can check online.",
  },
  {
    title: "Honest pricing",
    body: "Typically a fraction of the price of a mined diamond of the same grade.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  name: site.name,
  url: site.url,
  description: site.description,
  email: site.email,
  address: { "@type": "PostalAddress", addressLocality: site.city },
  makesOffer: shapes.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Product", name: `${s.name} cut lab-grown diamond` },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="relative isolate flex min-h-svh flex-col overflow-hidden bg-forest text-paper">
        {/* Phones: ring on the right edge at mid-height, between headline and buttons.
            Desktop: larger, beside the text. */}
        <DiamondRing className="absolute top-[calc(50%+2rem)] right-0 -z-10 w-[min(108vw,78svh)] translate-x-1/2 -translate-y-1/2 lg:top-1/2 lg:w-[min(118vh,68vw)] lg:translate-x-[42%]" />

        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-6 sm:justify-start sm:gap-12 sm:py-7 lg:px-10">
          <Link href="/" className="font-serif text-2xl whitespace-nowrap tracking-[0.12em] sm:text-3xl sm:tracking-[0.18em]">
            {site.name.toUpperCase()}
          </Link>
          <div className="flex gap-8 text-sm text-mist">
            <a href="#shapes" className="hover:text-paper">
              Shapes
            </a>
            <a href="#enquire" className="hover:text-paper">
              Enquire
            </a>
          </div>
        </nav>

        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pt-2 pb-10 lg:justify-center lg:px-10 lg:pt-0 lg:pb-24">
          <h1 className="max-w-[13ch] font-serif text-[clamp(2.5rem,7vw,5.75rem)] leading-[1.04] font-normal">
            Lab-grown diamonds, in the shape you love.
          </h1>
          <p className="mt-7 hidden max-w-[42ch] text-lg leading-relaxed text-mist sm:block">
            Certified CVD diamonds in twelve cuts. Pick a shape and a size, and we&apos;ll send
            you matching stones with prices within a day.
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-4 pt-10 lg:mt-10 lg:pt-0">
            <a
              href="#shapes"
              className="rounded-full bg-paper px-8 py-4 font-medium text-forest transition-colors hover:bg-gold"
            >
              Choose a shape
            </a>
            <a
              href="#enquire"
              className="text-mist underline decoration-mist/40 underline-offset-4 hover:text-paper"
            >
              Ask us directly
            </a>
          </div>
        </div>
      </header>

      <main>
        <section id="shapes" className="mx-auto max-w-6xl scroll-mt-8 px-6 py-24 lg:py-32">
          <h2 className="text-center font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] leading-tight">
            Twelve shapes
          </h2>
          <p className="mx-auto mt-4 mb-16 max-w-[48ch] text-center leading-relaxed text-stone">
            Tap a shape to start an enquiry for it.
          </p>
          <ShapeGrid />
        </section>

        <section className="border-t border-ink/10">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-3 lg:py-24">
            {facts.map((f) => (
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
              Tell us what you&apos;re looking for
            </h2>
            <p className="mt-4 mb-14 max-w-[48ch] leading-relaxed text-mist">
              We&apos;ll reply with a short list of stones, their reports and prices. No account,
              no obligation.
            </p>
            <EnquiryForm />
          </div>
        </section>
      </main>

      <footer className="bg-forest-deep text-mist">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
          <span className="font-serif text-xl tracking-[0.18em] text-paper">
            {site.name.toUpperCase()}
          </span>
          <span>
            {site.city} ·{" "}
            <a href={`mailto:${site.email}`} className="hover:text-paper">
              {site.email}
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}
