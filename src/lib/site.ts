// Edit these before launch — every page, the sitemap and the structured data read from here.
export const site = {
  name: "Radhe Impex",
  url: "https://example.com",
  tagline: "Lab-grown diamonds, cut in twelve shapes",
  description:
    "Certified CVD lab-grown diamonds in twelve classic shapes — round, oval, pear, emerald and more. Choose a shape and get matching stones with prices in a day.",
  email: "hello@example.com",
  // Country code + number, digits only, for wa.me links.
  whatsapp: "910000000000",
  city: "Surat, India",
};

export type Shape = {
  slug: string;
  name: string;
  note: string;
};

// Order matches the hero ring and the shapes grid.
export const shapes: Shape[] = [
  { slug: "round", name: "Round", note: "The most light return of any cut." },
  { slug: "oval", name: "Oval", note: "Looks larger than a round of the same weight." },
  { slug: "pear", name: "Pear", note: "A soft point that lengthens the finger." },
  { slug: "marquise", name: "Marquise", note: "The longest face-up spread per carat." },
  { slug: "cushion", name: "Cushion", note: "Rounded corners, big chunky sparkle." },
  { slug: "emerald", name: "Emerald", note: "Step-cut facets with a calm, mirrored look." },
  { slug: "princess", name: "Princess", note: "Crisp square with sharp corners." },
  { slug: "radiant", name: "Radiant", note: "Rectangular outline, brilliant sparkle." },
  { slug: "heart", name: "Heart", note: "Best chosen above one carat to read clearly." },
  { slug: "trillion", name: "Trillion", note: "A triangle, often used as side stones." },
  { slug: "asscher", name: "Asscher", note: "A square step cut with a windmill centre." },
  { slug: "moval", name: "Moval", note: "Between an oval and a marquise." },
];
