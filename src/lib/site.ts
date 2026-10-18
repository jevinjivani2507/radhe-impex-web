// Edit these before launch. Page copy lives in src/i18n/dictionaries.
// Absolute address used in share previews, canonical links and the sitemap.
// SITE_URL wins if set; otherwise Vercel's production domain (your custom
// domain once one is added), else the current vercel.app address.
const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://radhe-impex.vercel.app");

export const site = {
  name: "Radhe Impex",
  url: siteUrl,
  email: "hello@example.com",
  // Country code + number, digits only, for wa.me links.
  whatsapp: "910000000000",
};

// Order matches the hero ring and the shapes grid. Names and notes are per language.
export const shapeSlugs = [
  "round",
  "oval",
  "pear",
  "marquise",
  "cushion",
  "emerald",
  "princess",
  "radiant",
  "heart",
  "trillion",
  "asscher",
  "moval",
] as const;

export type ShapeSlug = (typeof shapeSlugs)[number];
