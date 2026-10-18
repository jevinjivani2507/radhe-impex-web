import type { MetadataRoute } from "next";
import { languageAlternates, locales } from "@/i18n/config";
import { site } from "@/lib/site";

// One entry per language, each listing the others so search engines link them.
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    Object.entries(languageAlternates).map(([l, path]) => [l, `${site.url}${path}`]),
  );
  return locales.map((lang) => ({
    url: `${site.url}/${lang}`,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
