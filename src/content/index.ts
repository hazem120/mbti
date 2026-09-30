/**
 * Localized domain prose. Server-only by convention: never import this from a
 * client component; pass the needed slice down as props instead.
 */

import type { Locale } from "@/lib/i18n";
import type { SiteContent } from "@/content/schema";
import { en } from "@/content/en";

export * from "@/content/schema";

/**
 * One entry per locale. Task 4 adds `src/content/ar/index.ts` exporting `ar`
 * and replaces the `ar: en` fallback below with `ar`.
 */
const CONTENT: Record<Locale, SiteContent> = {
  en,
  ar: en, // TODO(Task 4): Arabic content; English fallback until then.
};

export function getContent(locale: Locale): SiteContent {
  return CONTENT[locale];
}
