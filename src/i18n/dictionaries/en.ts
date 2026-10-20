// Source of truth for copy. km.ts and vi.ts must match this shape.
// `{brand}`, `{shape}` and `{size}` are filled in at runtime.
const en = {
  meta: {
    title: "Radhe Impex — Lab-grown CVD diamonds in twelve shapes",
    description:
      "Radhe Impex has manufactured certified CVD lab-grown diamonds since 2015, in twelve shapes — round, oval, pear, emerald and more. Offices in India, Thailand and Cambodia.",
    ogLine: "Certified CVD diamonds in twelve cuts",
  },
  nav: { shapes: "Shapes", enquire: "Enquire", language: "Language" },
  hero: {
    title: "Lab-grown diamonds, in the shape you love.",
    body: "Certified CVD diamonds in twelve cuts. Pick a shape and a size, and we'll send you matching stones with prices within a day.",
    primary: "Choose a shape",
    secondary: "Ask us directly",
  },
  shapes: {
    title: "Twelve shapes",
    body: "Tap a shape to start an enquiry for it.",
    alt: "{shape} cut lab-grown diamond",
    items: {
      round: { name: "Round", note: "The most light return of any cut." },
      oval: { name: "Oval", note: "Looks larger than a round of the same weight." },
      pear: { name: "Pear", note: "A soft point that lengthens the finger." },
      marquise: { name: "Marquise", note: "The longest face-up spread per carat." },
      cushion: { name: "Cushion", note: "Rounded corners, big chunky sparkle." },
      emerald: { name: "Emerald", note: "Step-cut facets with a calm, mirrored look." },
      princess: { name: "Princess", note: "Crisp square with sharp corners." },
      radiant: { name: "Radiant", note: "Rectangular outline, brilliant sparkle." },
      heart: { name: "Heart", note: "Best chosen above one carat to read clearly." },
      trillion: { name: "Trillion", note: "A triangle, often used as side stones." },
      asscher: { name: "Asscher", note: "A square step cut with a windmill centre." },
      moval: { name: "Moval", note: "Between an oval and a marquise." },
    },
  },
  facts: [
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
  ],
  enquiry: {
    title: "Tell us what you're looking for",
    body: "We'll reply with a short list of stones, their reports and prices. No account, no obligation.",
    shape: "Shape",
    size: "Size",
    name: "Your name",
    note: "Anything else (optional)",
    notePlaceholder: "Budget, setting, deadline…",
    sizes: ["Under 0.5 ct", "0.5 – 1 ct", "1 – 2 ct", "2 – 3 ct", "Over 3 ct", "Not sure yet"],
    send: "Send on WhatsApp",
    email: "Or send by email",
    message: "Hi {brand}, I'm looking for a {shape} diamond, {size}.",
    subject: "{shape} diamond enquiry",
  },
  about: {
    title: "Manufacturing lab-grown diamonds since 2015",
    body: "Radhe Impex has manufactured lab-grown diamonds since 2015. We supply jewellers and traders in many countries, with offices in India, Thailand and Cambodia.",
    officesLabel: "Offices",
    offices: ["Surat, India", "Bangkok, Thailand", "Cambodia"],
    customersLabel: "Customers in",
    countries: ["USA", "Israel", "Italy", "Brazil", "Dubai", "Thailand", "Cambodia", "Vietnam", "Myanmar"],
  },
  contact: {
    title: "Or talk to us directly",
    call: "Call",
    whatsapp: "WhatsApp",
    email: "Email",
    office: "Head office",
    directions: "Get directions",
  },
};

export default en;

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : { [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof en>;
