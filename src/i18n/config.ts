export const locales = ["en", "km", "vi"] as const;
export type Locale = (typeof locales)[number];

// Used when the browser asks for none of our languages (and for x-default).
export const defaultLocale: Locale = "en";

// Remembers the language a visitor last viewed, so "/" sends them back to it.
export const LOCALE_COOKIE = "lang";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const localeInfo: Record<Locale, { label: string; name: string; og: string }> = {
  en: { label: "EN", name: "English", og: "en_US" },
  km: { label: "ខ្មែរ", name: "ភាសាខ្មែរ", og: "km_KH" },
  vi: { label: "VI", name: "Tiếng Việt", og: "vi_VN" },
};

// hreflang map for <link rel="alternate">, the sitemap and Open Graph.
export const languageAlternates = {
  ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
  "x-default": "/",
} as Record<Locale | "x-default", string>;
