/**
 * Pure text-splitting helpers for the `SplitText` motion primitive.
 */

export type SplitMode = "chars" | "words";

export interface SplitWord {
  /** The whole word (used as the animated unit in `words` mode). */
  word: string;
  /** Grapheme-ish units (code points) of the word, used in `chars` mode. */
  chars: string[];
}

// Arabic, Arabic Supplement, Arabic Extended-A, Presentation Forms A/B.
const ARABIC_SCRIPT =
  /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;

/** True when text contains Arabic script (letters must stay joined). */
export function containsArabic(text: string): boolean {
  return ARABIC_SCRIPT.test(text);
}

/**
 * Chooses the split granularity: per-word for Arabic (locale or script),
 * per-character otherwise. An explicit mode always wins.
 */
export function resolveSplitMode(
  text: string,
  locale: string,
  explicit?: SplitMode,
): SplitMode {
  if (explicit) return explicit;
  if (locale === "ar" || locale.startsWith("ar-")) return "words";
  return containsArabic(text) ? "words" : "chars";
}

/** Splits text on whitespace into words, each with its characters. */
export function splitWords(text: string): SplitWord[] {
  return text
    .trim()
    .split(/\s+/u)
    .filter((word) => word.length > 0)
    .map((word) => ({ word, chars: Array.from(word) }));
}

/**
 * Groups words into animation units for `words` mode. Each unit becomes an
 * `inline-block`, and inline-blocks are bidi-neutral: a run of consecutive
 * words whose script runs *against* the paragraph direction (Latin words in
 * an RTL paragraph, Arabic words in an LTR one) would be visually reversed if
 * split. Such runs are merged into a single unit so they keep their order.
 */
export function groupWordsForBidi(words: SplitWord[], dir: "ltr" | "rtl"): string[] {
  const againstFlow = (word: string) =>
    dir === "rtl" ? !containsArabic(word) : containsArabic(word);
  const units: string[] = [];
  let run: string[] = [];
  for (const { word } of words) {
    if (againstFlow(word)) {
      run.push(word);
      continue;
    }
    if (run.length) {
      units.push(run.join(" "));
      run = [];
    }
    units.push(word);
  }
  if (run.length) units.push(run.join(" "));
  return units;
}
