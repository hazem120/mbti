"use client";

import { useLocale } from "next-intl";

import { dirFor, isLocale } from "@/lib/i18n";

/** Text direction of the active next-intl locale (`ltr` for unknown). */
export function useDir(): "ltr" | "rtl" {
  const locale = useLocale();
  return isLocale(locale) ? dirFor(locale) : "ltr";
}
