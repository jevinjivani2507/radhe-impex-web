// Edit these before launch. Page copy lives in src/i18n/dictionaries.
export const site = {
  name: "Radhe Impex",
  url: "https://example.com",
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
