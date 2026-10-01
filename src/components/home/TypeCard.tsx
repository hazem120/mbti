"use client";

import { ViewTransition, useId, type CSSProperties, type MouseEvent } from "react";
import { motion, type TargetAndTransition } from "motion/react";
import { ArrowRight } from "lucide-react";

import type { FunctionCode } from "@/data/functions";
import type { Temperament, TypeCode } from "@/data/types";
import { Link } from "@/i18n/navigation";
import { useSceneStore } from "@/lib/sceneStore";
import { Reveal } from "@/components/motion/Reveal";
import { SpotlightBorder } from "@/components/motion/SpotlightBorder";
import { TiltCard } from "@/components/motion/TiltCard";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { FunctionChip } from "@/components/visual/FunctionChip";
import { GlowOrb } from "@/components/visual/GlowOrb";

/** Everything one picker card shows (server-resolved, serializable). */
export interface PickerItem {
  code: TypeCode;
  temperament: Temperament;
  stack: readonly [FunctionCode, FunctionCode, FunctionCode, FunctionCode];
  accent: string;
  nickname: string;
  tagline: string;
}

export type CardState = "idle" | "chosen" | "dimmed";

export interface TypeCardProps {
  item: PickerItem;
  /** Position within its grid (staggers the reveal and desyncs the orb). */
  index: number;
  state: CardState;
  ariaLabel: string;
  exploreLabel: string;
  onChoose: (e: MouseEvent<HTMLAnchorElement>, code: TypeCode) => void;
}

// Opacity + scale only: a `filter` (even blur(0)) on an ancestor would make
// it the backdrop root and stop the glass from blurring the cosmos behind.
const STATE_ANIMATION: Record<CardState, TargetAndTransition> = {
  idle: { opacity: 1, scale: 1 },
  dimmed: { opacity: 0.16, scale: 0.97 },
  chosen: { opacity: 1, scale: [1, 0.96, 1.04] },
};

/**
 * One type in the picker: tilt + spotlight glass card in the type accent,
 * with a glowing orb, the code (a shared `ViewTransition` element that
 * morphs into the type hub hero), nickname, tagline and function stack.
 * It is a real link; `onChoose` may intercept a plain click to fly first.
 */
export function TypeCard({ item, index, state, ariaLabel, exploreLabel, onChoose }: TypeCardProps) {
  const { code } = item;
  const setHovered = useSceneStore((s) => s.setHovered);
  const taglineId = useId();

  const enter = () => setHovered(code);
  const leave = () => {
    if (useSceneStore.getState().hoveredType === code) setHovered(null);
  };

  return (
    <motion.div
      className="h-full"
      style={{ "--accent": item.accent } as CSSProperties}
      animate={STATE_ANIMATION[state]}
      transition={{ duration: state === "chosen" ? 0.6 : 0.5, ease: EASE_OUT_EXPO }}
    >
      <Reveal className="h-full" delay={(index % 4) * 0.08} distance={26}>
        <TiltCard className="h-full rounded-3xl" maxTilt={8} scale={1.025}>
          <SpotlightBorder className="glass h-full rounded-3xl" size={320}>
            <Link
              href={`/types/${code.toLowerCase()}`}
              data-testid="type-card"
              data-type={code}
              aria-label={ariaLabel}
              aria-describedby={taglineId}
              onClick={(e) => onChoose(e, code)}
              onPointerEnter={enter}
              onPointerLeave={leave}
              onFocus={enter}
              onBlur={leave}
              className="group/card relative flex h-full flex-col gap-4 rounded-3xl p-5 outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <ViewTransition name={`type-code-${code}`} share="auto" default="none">
                  <span
                    translate="no"
                    className="inline-block font-display text-3xl leading-none font-semibold tracking-[0.06em] text-fg sm:text-[2rem]"
                  >
                    {code}
                  </span>
                </ViewTransition>
                <GlowOrb
                  size={42}
                  intensity={0.75}
                  phase={index * 0.9 + item.code.length}
                  className="-mt-1 transition-transform duration-500 ease-out group-hover/card:scale-110"
                />
              </div>

              <div>
                <p className="text-base font-semibold text-(--accent)">{item.nickname}</p>
                <p
                  id={taglineId}
                  className="mt-1.5 text-sm leading-relaxed text-pretty text-muted-foreground"
                >
                  {item.tagline}
                </p>
              </div>

              <div aria-hidden className="mt-auto flex flex-wrap gap-1.5">
                {item.stack.map((fn) => (
                  <FunctionChip key={fn} code={fn} size="sm" />
                ))}
              </div>

              <span
                aria-hidden
                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors duration-300 group-hover/card:text-fg"
              >
                {exploreLabel}
                <ArrowRight className="size-3.5 transition-transform duration-300 rtl:-scale-x-100 ltr:group-hover/card:translate-x-1 rtl:group-hover/card:-translate-x-1" />
              </span>

              {state === "chosen" && (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-(--accent)"
                  initial={{ opacity: 0.9, scale: 1 }}
                  animate={{ opacity: 0, scale: 1.14 }}
                  transition={{ duration: 0.85, ease: "easeOut" }}
                />
              )}
            </Link>
          </SpotlightBorder>
        </TiltCard>
      </Reveal>
    </motion.div>
  );
}
