import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";

import { CountUp } from "@/components/motion/CountUp";
import { SplitText } from "@/components/motion/SplitText";
import { HeroCta } from "@/components/home/HeroCta";

/** Temperament tokens, start → end of the headline's second line. */
const HEADLINE_GRADIENT = [
  "var(--color-nt)",
  "var(--color-nf)",
  "var(--color-sj)",
  "var(--color-sp)",
] as const;

const STATS = [
  { key: "types", value: 16 },
  { key: "functions", value: 8 },
  { key: "pairings", value: 256 },
] as const;

const delay = (seconds: number): CSSProperties => ({ animationDelay: `${seconds}s` });

export interface HeroProps {
  /** Id of the picker section the CTA scrolls to. */
  pickerId: string;
}

/**
 * Full-viewport landing hero: eyebrow, split-text headline with a
 * temperament gradient, subtitle, magnetic CTA, count-up stats and a scroll
 * cue. Server component; every line is in the HTML before any JS runs.
 */
export async function Hero({ pickerId }: HeroProps) {
  const t = await getTranslations("home");

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[calc(100svh-3.6rem)] flex-col items-center justify-center px-4 pt-16 pb-32 text-center sm:px-6"
    >
      <div className="hero-rise" style={delay(0.05)}>
        <p className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase rtl:text-sm rtl:tracking-normal">
          <span aria-hidden className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-nf opacity-60" />
            <span className="relative size-2 rounded-full bg-nf shadow-[0_0_10px_2px_currentColor] text-nf" />
          </span>
          {t("eyebrow")}
        </p>
      </div>

      <h1
        id="hero-title"
        className="mt-8 max-w-5xl text-[clamp(2.75rem,9.5vw,7.25rem)] leading-[0.98] font-semibold tracking-tight text-balance rtl:leading-[1.3] rtl:tracking-normal"
      >
        <SplitText as="span" text={t("headlineTop")} immediate delay={0.2} className="block text-fg" />
        <SplitText
          as="span"
          text={t("headlineBottom")}
          immediate
          delay={0.5}
          className="block"
          // Room for descenders/diacritics: background-clip:text only
          // paints inside each unit's box.
          unitClassName="-my-[0.12em] py-[0.12em]"
          gradient={HEADLINE_GRADIENT}
        />
      </h1>

      <div className="hero-rise" style={delay(0.75)}>
        <p className="mx-auto mt-7 max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">
          {t("heroSubtitle")}
        </p>
      </div>

      <div className="hero-rise mt-10" style={delay(0.95)}>
        <HeroCta label={t("cta")} targetId={pickerId} />
      </div>

      <div className="hero-rise mt-14 w-full max-w-xl" style={delay(1.15)}>
        <dl
          aria-label={t("statsLabel")}
          className="grid grid-cols-3 [&>div+div]:border-s [&>div+div]:border-border"
        >
          {STATS.map(({ key, value }, i) => (
            <div key={key} className="flex flex-col-reverse items-center gap-1 px-2 sm:px-6">
              <dt className="text-xs text-muted-foreground sm:text-sm">{t(`stats.${key}`)}</dt>
              <dd className="text-3xl font-semibold text-fg tabular-nums sm:text-4xl ltr:font-display">
                <CountUp value={value} delay={0.4 + i * 0.12} duration={1.8} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="hero-rise absolute inset-x-0 bottom-8 flex justify-center" style={delay(1.8)}>
        <div aria-hidden className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="flex h-9 w-[1.4rem] justify-center rounded-full border border-border pt-2">
            <span className="scroll-cue-dot block size-1 rounded-full bg-fg" />
          </span>
          <span className="text-[0.65rem] tracking-[0.3em] uppercase rtl:text-xs rtl:tracking-normal">
            {t("scrollCue")}
          </span>
        </div>
      </div>
    </section>
  );
}
