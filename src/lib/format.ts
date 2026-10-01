/**
 * Locale-aware number formatting shared by `CountUp` and any other UI that
 * prints numbers. Arabic renders Arabic-Indic digits (٠١٢٣…).
 */

const ARABIC_LOCALE = "ar-EG";

/** Resolves the `Intl` locale + options for an app locale. */
export function numberFormatConfig(
  locale: string,
  options: Intl.NumberFormatOptions = {},
): { locale: string; options: Intl.NumberFormatOptions } {
  if (locale === "ar" || locale.startsWith("ar-")) {
    return {
      locale: ARABIC_LOCALE,
      options: { numberingSystem: "arab", ...options },
    };
  }
  return { locale, options };
}

/** Creates a formatter for an app locale (`en`, `ar`, or any BCP-47 tag). */
export function createNumberFormatter(
  locale: string,
  options: Intl.NumberFormatOptions = {},
): Intl.NumberFormat {
  const config = numberFormatConfig(locale, options);
  return new Intl.NumberFormat(config.locale, config.options);
}

/** One-shot convenience wrapper around `createNumberFormatter`. */
export function formatNumber(
  value: number,
  locale: string,
  options: Intl.NumberFormatOptions = {},
): string {
  return createNumberFormatter(locale, options).format(value);
}
