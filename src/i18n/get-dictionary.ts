import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((m) => m.default),
  km: () => import("./dictionaries/km").then((m) => m.default),
  vi: () => import("./dictionaries/vi").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();

