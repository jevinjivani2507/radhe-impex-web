"use client";

import { track } from "@vercel/analytics";
import { useEffect, useState } from "react";
import { shapes, site } from "@/lib/site";
import { PICK_SHAPE_EVENT } from "./shape-grid";

const sizes = ["Under 0.5 ct", "0.5 – 1 ct", "1 – 2 ct", "2 – 3 ct", "Over 3 ct", "Not sure yet"];

const field =
  "w-full border-b border-mist/40 bg-transparent py-3 text-lg text-paper outline-none transition-colors focus:border-gold";

export function EnquiryForm() {
  const [shape, setShape] = useState(shapes[0].name);
  const [size, setSize] = useState(sizes[2]);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const onPick = (e: Event) => setShape((e as CustomEvent<string>).detail);
    window.addEventListener(PICK_SHAPE_EVENT, onPick);
    return () => window.removeEventListener(PICK_SHAPE_EVENT, onPick);
  }, []);

  const message = [
    `Hi ${site.name}, I'm looking for a ${shape} diamond, ${size}.`,
    note && note.trim(),
    name && `— ${name.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    track("Enquiry", { shape, size, via: "whatsapp" });
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2">
      <label className="block">
        <span className="text-sm text-mist">Shape</span>
        <select value={shape} onChange={(e) => setShape(e.target.value)} className={field}>
          {shapes.map((s) => (
            <option key={s.slug} className="text-ink">
              {s.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-sm text-mist">Size</span>
        <select value={size} onChange={(e) => setSize(e.target.value)} className={field}>
          {sizes.map((s) => (
            <option key={s} className="text-ink">
              {s}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-sm text-mist">Your name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          className={field}
        />
      </label>
      <label className="block">
        <span className="text-sm text-mist">Anything else (optional)</span>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Budget, setting, deadline…"
          className={`${field} placeholder:text-mist/50`}
        />
      </label>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 sm:col-span-2">
        <button
          type="submit"
          className="rounded-full bg-paper px-8 py-4 text-base font-medium text-forest transition-colors hover:bg-gold"
        >
          Send on WhatsApp
        </button>
        <a
          onClick={() => track("Enquiry", { shape, size, via: "email" })}
          href={`mailto:${site.email}?subject=${encodeURIComponent(`${shape} diamond enquiry`)}&body=${encodeURIComponent(message)}`}
          className="text-mist underline decoration-mist/40 underline-offset-4 hover:text-paper"
        >
          Or send by email
        </a>
      </div>
    </form>
  );
}
