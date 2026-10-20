// Business details shared by every language. Page copy lives in src/i18n/dictionaries.
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
  email: "radheimpex2015@gmail.com",
  foundingYear: 2015,
  // Enquiry form messages go to the first contact's WhatsApp.
  contacts: [
    { name: "Haresh Jivani", phone: "+919824680080", display: "+91 98246 80080" },
    { name: "Paresh Jivani", phone: "+917621036162", display: "+91 76210 36162" },
  ],
  address: {
    lines: ["B-809 Diamond World, Mini Bazar", "Varachha Road, Surat 395006", "Gujarat, India"],
    street: "B-809 Diamond World, Mini Bazar, Varachha Road",
    city: "Surat",
    region: "Gujarat",
    postalCode: "395006",
    country: "IN",
  },
};

// wa.me wants the number as digits only.
export const whatsappNumber = (phone: string) => phone.replace(/\D/g, "");

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.name}, ${site.address.street}, ${site.address.city} ${site.address.postalCode}`,
)}`;

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
