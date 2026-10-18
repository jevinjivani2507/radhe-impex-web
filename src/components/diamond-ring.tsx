import Image from "next/image";
import { shapes } from "@/lib/site";

// A white ring with every shape set around it, and a gold band fixed at
// nine o'clock. The track turns one stone at a time (see `orbit` in
// globals.css); whichever stone stops at nine o'clock sits on the band and
// reads as a solitaire ring. Each stone counter-turns so it stays upright.
//
// Stones run clockwise, starting with the second shape on the band, so the
// band shows the shapes in list order.
const BAND_ANGLE = 270;
const FIRST_ON_BAND = 2;

export function DiamondRing({ className = "" }: { className?: string }) {
  const step = 360 / shapes.length;

  return (
    <div className={`@container aspect-square ${className}`} aria-hidden="true">
      <div className="relative size-full">
        <div className="absolute inset-0 rounded-full border-[18cqw] border-paper" />

        {/* Side view of a polished shank, centred under the nine o'clock stone. */}
        <div
          className="absolute top-1/2 left-[-12cqw] h-[2.6cqw] w-[42cqw] -translate-y-1/2 rounded-full shadow-[0_0.6cqw_1.2cqw_rgba(18,41,26,0.35)]"
          style={{
            background:
              "linear-gradient(180deg, #f6dc8c 0%, #e2bd5a 28%, #b8892c 62%, #8a6420 82%, #d6ae4e 100%)",
          }}
        />

        <div className="orbit-track absolute inset-0">
          {shapes.map((shape, i) => {
            const angle = BAND_ANGLE - (i - FIRST_ON_BAND) * step;
            return (
              <div
                key={shape.slug}
                className="absolute top-1/2 left-1/2 size-[12.5cqw]"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-41cqw) rotate(${-angle}deg)`,
                }}
              >
                <div className="orbit-stone relative size-full">
                  <Image
                    src={`/diamonds/${shape.slug}.png`}
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
