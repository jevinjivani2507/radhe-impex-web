import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Be_Vietnam_Pro, Cormorant_Garamond, Jost, Kantumruy_Pro, Noto_Serif_Khmer } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, languageAlternates, localeInfo, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";
import "../globals.css";

// The wordmark always uses Cormorant; headings and body switch per language,
// since Jost has no Vietnamese and neither family has Khmer.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
});
const jost = Jost({ variable: "--font-body", subsets: ["latin"] });
const beVietnam = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500"],
  preload: false,
});
const kantumruy = Kantumruy_Pro({ variable: "--font-body", subsets: ["khmer"], preload: false });
const notoSerifKhmer = Noto_Serif_Khmer({
  variable: "--font-display",
  subsets: ["khmer"],
  weight: ["400", "500"],
  preload: false,
});

const fontClasses: Record<Locale, string> = {
  en: `${cormorant.variable} ${jost.variable}`,
  vi: `${cormorant.variable} ${beVietnam.variable}`,
  km: `${cormorant.variable} ${kantumruy.variable} ${notoSerifKhmer.variable}`,
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);

  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: { canonical: `/${lang}`, languages: languageAlternates },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      url: `/${lang}`,
      locale: localeInfo[lang].og,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => localeInfo[l].og),
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#1b3a22",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${fontClasses[lang]} antialiased`}>
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
