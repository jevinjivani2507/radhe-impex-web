"use client";

import { track } from "@vercel/analytics";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { fill } from "@/i18n/fill";
import { site } from "@/lib/site";
import { PICK_SHAPE_EVENT, type ShapeItem } from "./shape-grid";

const field =
  "w-full border-b border-mist/40 bg-transparent py-3 text-lg text-paper outline-none transition-colors focus:border-gold";

export function EnquiryForm({
  t,
  shapes,
  locale,
}: {
  t: Dictionary["enquiry"];
  shapes: ShapeItem[];
  locale: string;
}) {
  const [slug, setSlug] = useState(shapes[0].slug);
  const [sizeIndex, setSizeIndex] = useState(2);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const onPick = (e: Event) => setSlug((e as CustomEvent<ShapeItem["slug"]>).detail);
    window.addEventListener(PICK_SHAPE_EVENT, onPick);
    return () => window.removeEventListener(PICK_SHAPE_EVENT, onPick);
  }, []);

  const shapeName = shapes.find((s) => s.slug === slug)?.name ?? slug;
  const size = t.sizes[sizeIndex];
  const message = [
    fill(t.message, { brand: site.name, shape: shapeName, size }),
    note.trim(),
    name.trim() && `— ${name.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");

  // Events use the English slug and size index so reports group across languages.
  const trackEnquiry = (via: "whatsapp" | "email") =>
    track("Enquiry", { shape: slug, size: sizeIndex, via, locale });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEnquiry("whatsapp");
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2">
      <label className="block">
        <span className="text-sm text-mist">{t.shape}</span>
        <select
          value={slug}
          onChange={(e) => setSlug(e.target.value as ShapeItem["slug"])}
          className={field}
        >
          {shapes.map((s) => (
            <option key={s.slug} value={s.slug} className="text-ink">
              {s.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-sm text-mist">{t.size}</span>
        <select
          value={sizeIndex}
          onChange={(e) => setSizeIndex(Number(e.target.value))}
          className={field}
        >
          {t.sizes.map((s, i) => (
            <option key={s} value={i} className="text-ink">
              {s}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-sm text-mist">{t.name}</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          className={field}
        />
      </label>
      <label className="block">
        <span className="text-sm text-mist">{t.note}</span>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t.notePlaceholder}
          className={`${field} placeholder:text-mist/50`}
        />
      </label>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 sm:col-span-2">
        <button
          type="submit"
          className="rounded-full bg-paper px-8 py-4 text-base font-medium text-forest transition-colors hover:bg-gold"
        >
          {t.send}
        </button>
        <a
          onClick={() => trackEnquiry("email")}
          href={`mailto:${site.email}?subject=${encodeURIComponent(fill(t.subject, { shape: shapeName }))}&body=${encodeURIComponent(message)}`}
          className="text-mist underline decoration-mist/40 underline-offset-4 hover:text-paper"
        >
          {t.email}
        </a>
      </div>
    </form>
  );
}
