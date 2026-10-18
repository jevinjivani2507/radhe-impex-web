import Link from "next/link";
import { localeInfo, locales, type Locale } from "@/i18n/config";

// Plain links between the language versions. No prefetch: visiting a language
// sets the remembered-language cookie in proxy.ts, and a prefetch would set it too.
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  return (
    <nav aria-label={label} className="flex items-center gap-4 text-sm">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}`}
          prefetch={false}
          hrefLang={l}
          lang={l}
          aria-label={localeInfo[l].name}
          aria-current={l === current ? "page" : undefined}
          className={
            l === current
              ? "text-paper underline decoration-gold decoration-2 underline-offset-8"
              : "text-mist hover:text-paper"
          }
        >
          {localeInfo[l].label}
        </Link>
      ))}
    </nav>
  );
}
