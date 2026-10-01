"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { isLocale, type Locale } from "@/lib/i18n";

const OTHER_LOCALE: Record<Locale, Locale> = {
  en: "ar",
  ar: "en",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common");

  if (!isLocale(locale)) return null;

  const target = OTHER_LOCALE[locale];

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: target })}
      aria-label={t("switchLanguage")}
      className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)"
    >
      {t(`localeNames.${target}`)}
    </button>
  );
}
