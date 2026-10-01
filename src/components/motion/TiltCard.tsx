"use client";

import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";
import { useFinePointer } from "@/lib/useMediaQuery";
import { POINTER_SPRING } from "@/components/motion/easing";

export interface TiltCardProps {
  children: ReactNode;
  /** Maximum tilt in degrees on each axis. Default `10`. */
  maxTilt?: number;
  /** Scale while hovered. Default `1.02`. */
  scale?: number;
  /** Show the moving glare highlight. Default `true`. */
  glare?: boolean;
  /** Peak glare opacity (0–1). Default `0.22`. */
  glareOpacity?: number;
  /** CSS perspective in px. Default `900`. */
  perspective?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * 3D tilt that follows the pointer on a spring, with a glare layer. Inert on
 * coarse pointers (touch) and under reduced motion. The card keeps its
 * border-radius on the glare via `rounded-[inherit]`, so put the radius on
 * `className`.
 */
export function TiltCard({
  children,
  maxTilt = 10,
  scale = 1.02,
  glare = true,
  glareOpacity = 0.22,
  perspective = 900,
  className,
  style,
}: TiltCardProps) {
  const reduce = useReducedMotion();
  const finePointer = useFinePointer();
  const enabled = finePointer && !reduce;
  const rectRef = useRef<DOMRect | null>(null);

  // Pointer position within the card, 0..1 on each axis (0.5 = centre).
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useMotionValue(0);

  // The side under the pointer presses away from the viewer.
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), POINTER_SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), POINTER_SPRING);
  const s = useSpring(useTransform(hover, [0, 1], [1, scale]), POINTER_SPRING);
  const glareAlpha = useSpring(useTransform(hover, [0, 1], [0, glareOpacity]), POINTER_SPRING);
  // The glare is a 2x-sized radial gradient moved with transforms only
  // (no per-frame background repaint): 50% of its size = 100% of the card.
  const gx = useTransform(px, (v) => `${(v - 0.5) * 50}%`);
  const gy = useTransform(py, (v) => `${(v - 0.5) * 50}%`);

  function onPointerEnter(e: PointerEvent<HTMLDivElement>) {
    if (!enabled) return;
    rectRef.current = e.currentTarget.getBoundingClientRect();
    hover.set(1);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!enabled) return;
    const rect = rectRef.current ?? e.currentTarget.getBoundingClientRect();
    px.set(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)));
    py.set(Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height)));
  }

  function onPointerLeave() {
    rectRef.current = null;
    px.set(0.5);
    py.set(0.5);
    hover.set(0);
  }

  return (
    <motion.div
      className={cn("relative", className)}
      style={{
        ...style,
        rotateX,
        rotateY,
        scale: s,
        transformPerspective: perspective,
      }}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
      {glare && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
        >
          <motion.span
            className="absolute inset-[-50%] bg-[radial-gradient(circle_at_center,rgb(255_255_255/0.9),transparent_28%)] mix-blend-soft-light"
            style={{ x: gx, y: gy, opacity: glareAlpha }}
          />
        </span>
      )}
    </motion.div>
  );
}
