/**
 * Localized domain prose. Server-only by convention: never import this from a
 * client component; pass the needed slice down as props instead.
 */

import type { Locale } from "@/lib/i18n";
import type { SiteContent } from "@/content/schema";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

export * from "@/content/schema";

/** One entry per locale. */
const CONTENT: Record<Locale, SiteContent> = {
  en,
  ar,
};

export function getContent(locale: Locale): SiteContent {
  return CONTENT[locale];
}
