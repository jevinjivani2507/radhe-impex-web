import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
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

export default async function Image() {
  const [cormorant, jost, ...stones] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/cormorant-400.ttf")),
    readFile(join(process.cwd(), "src/assets/jost-400.ttf")),
    ...placed.map((p) =>
      readFile(join(process.cwd(), `public/diamonds/${p.slug}.png`), "base64"),
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
          fontFamily: "Jost",
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
          <div style={{ fontFamily: "Cormorant", fontSize: 40, letterSpacing: 7 }}>
            {site.name.toUpperCase()}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Cormorant", fontSize: 84, lineHeight: 1.02 }}>
              Lab-grown diamonds, in the shape you love.
            </div>
            <div style={{ marginTop: 28, fontSize: 28, color: "#c9d6cc" }}>
              Certified CVD diamonds in twelve cuts
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: cormorant, style: "normal", weight: 400 },
        { name: "Jost", data: jost, style: "normal", weight: 400 },
      ],
    },
  );
}
