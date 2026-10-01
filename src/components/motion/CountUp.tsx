"use client";

import { useEffect, useMemo, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { useLocale } from "next-intl";

import { cn } from "@/lib/utils";
import { createNumberFormatter } from "@/lib/format";
import { EASE_OUT_EXPO } from "@/components/motion/easing";

export interface CountUpProps {
  /** Target value. */
  value: number;
  /** Starting value. Default `0`. */
  from?: number;
  /** Seconds. Default `1.6`. */
  duration?: number;
  /** Seconds before counting starts. Default `0`. */
  delay?: number;
  /** Extra `Intl.NumberFormat` options (e.g. `{ style: "percent" }`). */
  format?: Intl.NumberFormatOptions;
  /** Override the next-intl locale. Arabic renders Arabic-Indic digits. */
  locale?: string;
  /** Count only the first time it enters view. Default `true`. */
  once?: boolean;
  className?: string;
}

/**
 * Counts from `from` to `value` when scrolled into view. Updates the DOM
 * text directly (no per-frame React renders). Screen readers get the final
 * value via an `sr-only` copy; the ticking digits are `aria-hidden`.
 */
export function CountUp({
  value,
  from = 0,
  duration = 1.6,
  delay = 0,
  format,
  locale: localeProp,
  once = true,
  className,
}: CountUpProps) {
  const intlLocale = useLocale();
  const locale = localeProp ?? intlLocale;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, amount: 0.6 });

  // Stable key for the options object so callers can pass inline literals.
  const formatKey = JSON.stringify(format ?? {});
  const formatter = useMemo(
    () => createNumberFormatter(locale, JSON.parse(formatKey) as Intl.NumberFormatOptions),
    [locale, formatKey],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!inView) {
      if (!once) el.textContent = formatter.format(from);
      return;
    }
    if (reduce) {
      el.textContent = formatter.format(value);
      return;
    }
    // Integer counts tick through whole numbers (no "12.347" mid-flight).
    const whole =
      Number.isInteger(from) && Number.isInteger(value) && format?.style !== "percent";
    const controls = animate(from, value, {
      duration,
      delay,
      ease: EASE_OUT_EXPO,
      onUpdate: (latest) => {
        el.textContent = formatter.format(whole ? Math.round(latest) : latest);
      },
    });
    return () => controls.stop();
  }, [inView, once, reduce, from, value, duration, delay, formatter, format?.style]);

  return (
    <span className={cn("tabular-nums", className)}>
      <span className="sr-only">{formatter.format(value)}</span>
      <span ref={ref} aria-hidden>
        {formatter.format(from)}
      </span>
    </span>
  );
}
