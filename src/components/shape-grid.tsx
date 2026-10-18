"use client";

import Image from "next/image";
import { fill } from "@/i18n/fill";
import type { ShapeSlug } from "@/lib/site";

export const PICK_SHAPE_EVENT = "pick-shape";

export type ShapeItem = { slug: ShapeSlug; name: string; note: string };

export function ShapeGrid({ items, alt }: { items: ShapeItem[]; alt: string }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((shape) => (
        <li key={shape.slug}>
          <a
            href="#enquire"
            onClick={() =>
              window.dispatchEvent(new CustomEvent(PICK_SHAPE_EVENT, { detail: shape.slug }))
            }
            className="group block rounded-sm"
          >
            <div className="relative mx-auto h-36 w-28 sm:h-44 sm:w-32">
              <Image
                src={`/diamonds/${shape.slug}.png`}
                alt={fill(alt, { shape: shape.name })}
                fill
                sizes="128px"
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-5 text-center font-serif text-2xl text-ink">{shape.name}</h3>
            <p className="mx-auto mt-1 max-w-[22ch] text-center text-sm leading-relaxed text-stone">
              {shape.note}
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
}
