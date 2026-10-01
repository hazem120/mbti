"use client";

import { Fragment, useMemo, type CSSProperties } from "react";
import { motion, stagger as staggerFn, useReducedMotion, type Variants } from "motion/react";
import { useLocale } from "next-intl";

import { cn } from "@/lib/utils";
import {
  groupWordsForBidi,
  resolveSplitMode,
  splitWords,
  type SplitMode,
} from "@/lib/splitText";
import { dirFor, isLocale } from "@/lib/i18n";
import { unitGradients } from "@/lib/gradientText";
import { EASE_OUT_EXPO, REDUCED_TRANSITION } from "@/components/motion/easing";

const TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  p: motion.p,
  span: motion.span,
  div: motion.div,
} as const;

export type SplitTextTag = keyof typeof TAGS;

const HEADINGS: ReadonlySet<SplitTextTag> = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

export interface SplitTextProps {
  /** The full text. Also the accessible name / screen-reader copy. */
  text: string;
  /** Element to render. Default `span`. */
  as?: SplitTextTag;
  /** Seconds before the first unit starts. Default `0`. */
  delay?: number;
  /** Seconds between units. Default `0.028` (chars) / `0.07` (words). */
  stagger?: number;
  /** Animate only the first time it enters the viewport. Default `true`. */
  once?: boolean;
  /** Animate on mount instead of on viewport entry. Default `false`. */
  immediate?: boolean;
  /** Force a split mode. Default: words for Arabic (locale or script), chars otherwise. */
  split?: SplitMode;
  /** Override the next-intl locale used to pick the split mode. */
  locale?: string;
  /** Fraction of the element that must be visible to trigger. Default `0.4`. */
  amount?: number;
  className?: string;
  /** Class applied to every animated unit (letter or word). */
  unitClassName?: string;
  /**
   * Paint one continuous gradient across the whole text (CSS colours, from
   * line start to end; mirrors under RTL). Each unit gets its slice, so the
   * gradient survives the per-unit animation. Serializable, so server
   * components can pass it.
   */
  gradient?: readonly string[];
  id?: string;
}

/**
 * Staggered blur + rise + fade text reveal.
 *
 * - Latin: per-letter spans, grouped per word (`whitespace-nowrap`) so lines
 *   only break between words.
 * - Arabic: per-word spans, so letters stay joined. Runs of words in the
 *   opposite script (e.g. "INFJ · Ni" inside Arabic) animate as one unit so
 *   bidi reordering can't reverse them.
 * - Accessibility: headings carry `aria-label={text}`; other tags render an
 *   `sr-only` copy (aria-label is not allowed on generic elements). The
 *   animated spans are `aria-hidden`.
 * - Hydration-safe: markup depends only on `text`/locale; the reduced-motion
 *   preference only changes transitions (fade only, no stagger).
 */
export function SplitText({
  text,
  as = "span",
  delay = 0,
  stagger,
  once = true,
  immediate = false,
  split,
  locale: localeProp,
  amount = 0.4,
  className,
  unitClassName,
  gradient,
  id,
}: SplitTextProps) {
  const intlLocale = useLocale();
  const locale = localeProp ?? intlLocale;
  const reduce = useReducedMotion();

  const mode = resolveSplitMode(text, locale, split);
  const dir = isLocale(locale) ? dirFor(locale) : "ltr";
  const words = useMemo(() => splitWords(text), [text]);
  // In words mode, units are bidi-safe groups (see groupWordsForBidi).
  const units = useMemo(
    () =>
      mode === "words"
        ? groupWordsForBidi(words, dir).map((word) => ({ word, chars: [word] }))
        : words,
    [mode, words, dir],
  );
  const interval = stagger ?? (mode === "words" ? 0.07 : 0.028);

  // Flat list of per-unit gradient slices (chars: one per letter).
  const gradientKey = gradient?.join("|") ?? "";
  const slices = useMemo(() => {
    if (!gradientKey) return null;
    const lengths =
      mode === "words"
        ? units.map((u) => [...u.word].length)
        : units.flatMap((u) => u.chars.map(() => 1));
    return unitGradients(lengths, gradientKey.split("|"), dir === "rtl");
  }, [gradientKey, mode, units, dir]);
  const sliceStyle = (index: number): CSSProperties | undefined =>
    slices
      ? {
          backgroundImage: slices[index],
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }
      : undefined;
  // Running letter index across words (chars mode) for `sliceStyle`.
  const charOffsets = useMemo(
    () =>
      units.reduce<number[]>((offsets, _u, i) => {
        offsets.push(i === 0 ? 0 : offsets[i - 1] + units[i - 1].chars.length);
        return offsets;
      }, []),
    [units],
  );

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: reduce ? delay : staggerFn(interval, { startDelay: delay }),
      },
    },
  };

  const unit: Variants = {
    hidden: { opacity: 0, y: "0.45em", filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: reduce ? REDUCED_TRANSITION : { duration: 0.9, ease: EASE_OUT_EXPO },
    },
  };

  const Tag = TAGS[as];
  const isHeading = HEADINGS.has(as);
  const unitClass = cn("inline-block", unitClassName);
  const trigger = immediate
    ? { animate: "visible" }
    : { whileInView: "visible", viewport: { once, amount } };

  return (
    <Tag
      id={id}
      className={className}
      aria-label={isHeading ? text : undefined}
      initial="hidden"
      variants={container}
      {...trigger}
    >
      {!isHeading && <span className="sr-only">{text}</span>}
      {units.map((w, i) => (
        <Fragment key={i}>
          {mode === "words" ? (
            <motion.span aria-hidden className={unitClass} variants={unit} style={sliceStyle(i)}>
              {w.word}
            </motion.span>
          ) : (
            <span aria-hidden className="inline-block whitespace-nowrap">
              {w.chars.map((ch, j) => (
                <motion.span
                  key={j}
                  className={unitClass}
                  variants={unit}
                  style={sliceStyle(charOffsets[i] + j)}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          )}
          {i < units.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
