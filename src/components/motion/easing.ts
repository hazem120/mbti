import type { Transition } from "motion/react";

/** Expo-out: fast start, long silky settle. The kit's default reveal curve. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Snappy-but-soft spring used for pointer-following effects. */
export const POINTER_SPRING = { stiffness: 220, damping: 22, mass: 0.6 } as const;

/**
 * Reduced-motion transition: opacity fades, every other value jumps.
 * Hidden variants keep their transforms so SSR markup never depends on the
 * (client-only) reduced-motion preference — only the transition changes.
 */
export const REDUCED_TRANSITION: Transition = {
  duration: 0.35,
  ease: "easeOut",
  x: { duration: 0 },
  y: { duration: 0 },
  scale: { duration: 0 },
  rotate: { duration: 0 },
  filter: { duration: 0 },
};
