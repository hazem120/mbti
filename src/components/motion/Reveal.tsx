"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { useDir } from "@/lib/useDir";
import { EASE_OUT_EXPO, REDUCED_TRANSITION } from "@/components/motion/easing";

const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  li: motion.li,
  p: motion.p,
  span: motion.span,
} as const;

export type RevealTag = keyof typeof TAGS;

/** `start`/`end` are logical: they mirror automatically under RTL. */
export type RevealDirection = "up" | "down" | "start" | "end" | "none";

export interface RevealProps {
  children: ReactNode;
  /** Where the content comes from. Default `up`. */
  direction?: RevealDirection;
  /** Seconds before the reveal starts. Default `0`. */
  delay?: number;
  /** Seconds. Default `0.8`. */
  duration?: number;
  /** Travel distance in px. Default `28`. */
  distance?: number;
  /** Add a blur-in. Default `false`. */
  blur?: boolean;
  /** Reveal only the first time. Default `true`. */
  once?: boolean;
  /** Fraction visible before triggering. Default `0.25`. */
  amount?: number;
  /** Animate on mount instead of on viewport entry. Default `false`. */
  immediate?: boolean;
  as?: RevealTag;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

function offset(direction: RevealDirection, distance: number, rtl: boolean) {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    // "start" enters from the inline-start edge: left in LTR, right in RTL.
    case "start":
      return { x: rtl ? distance : -distance, y: 0 };
    case "end":
      return { x: rtl ? -distance : distance, y: 0 };
    case "none":
      return { x: 0, y: 0 };
  }
}

/** Fades + slides its children in when they scroll into view. */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance = 28,
  blur = false,
  once = true,
  amount = 0.25,
  immediate = false,
  as = "div",
  className,
  style,
  id,
}: RevealProps) {
  const reduce = useReducedMotion();
  const rtl = useDir() === "rtl";
  const { x, y } = offset(direction, distance, rtl);

  const variants: Variants = {
    hidden: { opacity: 0, x, y, ...(blur ? { filter: "blur(12px)" } : {}) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      ...(blur ? { filter: "blur(0px)" } : {}),
      transition: reduce
        ? { ...REDUCED_TRANSITION, delay }
        : { duration, delay, ease: EASE_OUT_EXPO },
    },
  };

  const Tag = TAGS[as];
  const trigger = immediate
    ? { animate: "visible" }
    : { whileInView: "visible", viewport: { once, amount } };

  return (
    <Tag
      id={id}
      className={className}
      style={style}
      initial="hidden"
      variants={variants}
      {...trigger}
    >
      {children}
    </Tag>
  );
}
