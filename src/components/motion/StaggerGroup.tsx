"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, stagger as staggerFn, useReducedMotion, type Variants } from "motion/react";

import { EASE_OUT_EXPO, REDUCED_TRANSITION } from "@/components/motion/easing";

const GROUP_TAGS = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  section: motion.section,
  nav: motion.nav,
} as const;

const ITEM_TAGS = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  span: motion.span,
} as const;

export type StaggerGroupTag = keyof typeof GROUP_TAGS;
export type StaggerItemTag = keyof typeof ITEM_TAGS;

export interface StaggerGroupProps {
  children: ReactNode;
  /** Seconds between children. Default `0.08`. */
  stagger?: number;
  /** Seconds before the first child. Default `0`. */
  delay?: number;
  /** Default `true`. */
  once?: boolean;
  /** Fraction visible before triggering. Default `0.15`. */
  amount?: number;
  /** Animate on mount instead of on viewport entry. Default `false`. */
  immediate?: boolean;
  as?: StaggerGroupTag;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

/**
 * Orchestrates `hidden` → `visible` variants across its children with a
 * stagger. Children opt in by being a `StaggerItem` (or any motion element
 * with `hidden`/`visible` variants).
 */
export function StaggerGroup({
  children,
  stagger = 0.08,
  delay = 0,
  once = true,
  amount = 0.15,
  immediate = false,
  as = "div",
  className,
  style,
  id,
}: StaggerGroupProps) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: staggerFn(reduce ? Math.min(stagger, 0.03) : stagger, {
          startDelay: delay,
        }),
      },
    },
  };
  const Tag = GROUP_TAGS[as];
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

export interface StaggerItemProps {
  children: ReactNode;
  /** Rise distance in px. Default `18`. */
  distance?: number;
  /** Start slightly scaled down. Default `false`. */
  pop?: boolean;
  as?: StaggerItemTag;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

/** A child of `StaggerGroup`: fades, rises (and optionally pops) in. */
export function StaggerItem({
  children,
  distance = 18,
  pop = false,
  as = "div",
  className,
  style,
  id,
}: StaggerItemProps) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: distance, scale: pop ? 0.92 : 1 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reduce ? REDUCED_TRANSITION : { duration: 0.7, ease: EASE_OUT_EXPO },
    },
  };
  const Tag = ITEM_TAGS[as];

  return (
    <Tag id={id} className={className} style={style} variants={variants}>
      {children}
    </Tag>
  );
}
