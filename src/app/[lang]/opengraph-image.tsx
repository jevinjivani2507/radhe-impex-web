import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";

export const alt = `${site.name} — lab-grown diamonds in twelve shapes`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same composition as the hero: half a white ring on the right edge, stones set around it.
const ring = { diameter: 780, cx: 1190, cy: 315 };
const band = ring.diameter * 0.18;
const orbit = ring.diameter / 2 - band / 2;
const stone = 96;
const placed = [
  { slug: "round", angle: 112 },
  { slug: "oval", angle: 140 },
  { slug: "pear", angle: 168 },
  { slug: "emerald", angle: 196 },
  { slug: "heart", angle: 224 },
  { slug: "princess", angle: 252 },
];

// Font files per language, tried in order for each glyph. Cormorant stays first
// for the Latin wordmark.
const fontFiles: Record<"en" | "vi", { display: string[]; body: string[] }> = {
  en: { display: ["cormorant-400"], body: ["jost-400"] },
  vi: {
    display: ["cormorant-400", "cormorant-400-vi"],
    body: ["bevietnam-400", "bevietnam-400-vi"],
  },
};

const load = (name: string) => readFile(join(process.cwd(), `src/assets/${name}.ttf`));

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  // The image renderer cannot shape Khmer script (vowels and subscripts land in
  // the wrong place), so the Khmer preview uses the English copy.
  const lang: "en" | "vi" = hasLocale(raw) && raw === "vi" ? "vi" : "en";
  const t = await getDictionary(lang);
  const files = fontFiles[lang];

  const [display, body, stones] = await Promise.all([
    Promise.all(files.display.map(load)),
    Promise.all(files.body.map(load)),
    Promise.all(
      placed.map((p) =>
        readFile(join(process.cwd(), `public/diamonds/${p.slug}.png`), "base64"),
      ),
    ),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#1b3a22",
          color: "#ffffff",
          fontFamily: files.body.map((_, i) => `Body${i}`).join(", "),
        }}
      >
        <div
          style={{
            position: "absolute",
            left: ring.cx - ring.diameter / 2,
            top: ring.cy - ring.diameter / 2,
            width: ring.diameter,
            height: ring.diameter,
            borderRadius: ring.diameter,
            border: `${band}px solid #ffffff`,
          }}
        />
        {placed.map((p, i) => {
          const rad = (p.angle * Math.PI) / 180;
          return (
            <img
              key={p.slug}
              src={`data:image/png;base64,${stones[i]}`}
              alt=""
              style={{
                position: "absolute",
                left: ring.cx + Math.cos(rad) * orbit - stone / 2,
                top: ring.cy - Math.sin(rad) * orbit - stone / 2,
                width: stone,
                height: stone,
                objectFit: "contain",
              }}
            />
          );
        })}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            width: 720,
          }}
        >
          <div style={{ fontFamily: "Display0", fontSize: 40, letterSpacing: 7 }}>
            {site.name.toUpperCase()}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: files.display.map((_, i) => `Display${i}`).join(", "),
                fontSize: 84,
                lineHeight: 1.02,
              }}
            >
              {t.hero.title}
            </div>
            <div style={{ marginTop: 28, fontSize: 28, color: "#c9d6cc" }}>{t.meta.ogLine}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        ...display.map((data, i) => ({ name: `Display${i}`, data, style: "normal" as const, weight: 400 as const })),
        ...body.map((data, i) => ({ name: `Body${i}`, data, style: "normal" as const, weight: 400 as const })),
      ],
    },
  );
}
