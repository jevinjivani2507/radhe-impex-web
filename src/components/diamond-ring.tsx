import Image from "next/image";
import { shapeSlugs } from "@/lib/site";

// A white ring with every shape set around it, and a gold band fixed at
// nine o'clock. The track turns one stone at a time (see `orbit` in
// globals.css); each stone that stops at nine o'clock sits on the band and
// reads as a solitaire ring. Each stone counter-turns so it stays upright.
// The pear starts on the band, then the shapes follow in list order.
const BAND_ANGLE = 270;
const FIRST_ON_BAND = 2;

export function DiamondRing({ className = "" }: { className?: string }) {
  const step = 360 / shapeSlugs.length;

  return (
    <div className={`@container aspect-square ${className}`} aria-hidden="true">
      <div className="relative size-full">
        <div className="absolute inset-0 rounded-full border-[18cqw] border-paper" />

        {/* Gold band seen edge-on, like a solitaire viewed from the side: a polished
            tube lit from above, darkening at the ends where it curves away. */}
        <div className="absolute top-1/2 left-[-12cqw] h-[3cqw] w-[42cqw] -translate-y-1/2 rounded-full shadow-[0_0.7cqw_1.4cqw_rgba(30,20,4,0.28),0_0.15cqw_0.3cqw_rgba(30,20,4,0.25)]">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(180deg, #fff4cc 0%, #f3d27a 12%, #e0b44f 30%, #c4922f 52%, #946719 74%, #6f4b10 86%, #a57a2b 94%, #d8b261 100%)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(70,42,6,0.55) 0%, rgba(70,42,6,0) 9%, rgba(255,240,200,0.18) 30%, rgba(70,42,6,0) 55%, rgba(70,42,6,0) 91%, rgba(70,42,6,0.55) 100%)",
            }}
          />
          <div className="absolute top-[16%] right-[7%] left-[7%] h-[16%] rounded-full bg-white/75 blur-[0.12cqw]" />
        </div>

        <div className="orbit-track absolute inset-0">
          {shapeSlugs.map((slug, i) => {
            const angle = BAND_ANGLE - (i - FIRST_ON_BAND) * step;
            return (
              <div
                key={slug}
                className="absolute top-1/2 left-1/2 size-[12.5cqw]"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-41cqw) rotate(${-angle}deg)`,
                }}
              >
                <div className="orbit-stone relative size-full">
                  <Image
                    src={`/diamonds/${slug}.png`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 120px, 25vw"
                    className="object-contain drop-shadow-[0_6px_10px_rgba(18,41,26,0.18)]"
                    priority
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
