"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import { cn } from "@/lib/utils";
import { useFinePointer } from "@/lib/useMediaQuery";

export interface MagneticProps {
  children: ReactNode;
  /** Fraction of the pointer offset the child follows (0–1). Default `0.35`. */
  strength?: number;
  /** Extra activation zone around the element, in px. Default `60`. */
  radius?: number;
  className?: string;
}

const SPRING = { stiffness: 180, damping: 15, mass: 0.4 } as const;

/**
 * Pulls its child toward the cursor while the pointer is within the element
 * plus `radius`, then springs back. Inert on touch and under reduced motion.
 * Renders an `inline-block` span so it wraps buttons/links without layout
 * changes.
 */
export function Magnetic({ children, strength = 0.35, radius = 60, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const finePointer = useFinePointer();
  const enabled = finePointer && !reduce;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;

    let frame = 0;
    let lastX = 0;
    let lastY = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // Remove our own current offset so the target doesn't chase itself.
      const cx = rect.left + rect.width / 2 - x.get();
      const cy = rect.top + rect.height / 2 - y.get();
      const dx = lastX - cx;
      const dy = lastY - cy;
      const inside =
        Math.abs(dx) <= rect.width / 2 + radius && Math.abs(dy) <= rect.height / 2 + radius;
      rawX.set(inside ? dx * strength : 0);
      rawY.set(inside ? dy * strength : 0);
    };

    const onMove = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const reset = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", reset);
      if (frame) cancelAnimationFrame(frame);
      reset();
    };
  }, [enabled, radius, strength, rawX, rawY, x, y]);

  return (
    <motion.span ref={ref} className={cn("inline-block", className)} style={{ x, y }}>
      {children}
    </motion.span>
  );
}
