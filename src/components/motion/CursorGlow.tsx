"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

import { useFinePointer, usePrefersReducedMotion } from "@/lib/useMediaQuery";

export interface CursorGlowProps {
  /** Glow diameter in px. Default `640`. */
  size?: number;
  /** Glow colour (any CSS colour). Default `var(--accent)`. */
  color?: string;
  /** Peak opacity of the glow centre (0–1). Default `0.16`. */
  intensity?: number;
}

/**
 * A large, soft radial glow that trails the pointer behind page content.
 * Desktop only (fine pointer) and disabled under reduced motion. Mount once
 * (the locale layout does). Renders nothing on the server.
 */
export function CursorGlow(props: CursorGlowProps) {
  // Hydration-safe gates: both are `false` on the server and first render.
  const finePointer = useFinePointer();
  const reduced = usePrefersReducedMotion();
  if (!finePointer || reduced) return null;
  return <CursorGlowLayer {...props} />;
}

function CursorGlowLayer({
  size = 640,
  color = "var(--accent)",
  intensity = 0.16,
}: CursorGlowProps) {
  const half = size / 2;
  const x = useMotionValue(-size);
  const y = useMotionValue(-size);
  const opacity = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 90, damping: 22, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.8 });
  const so = useSpring(opacity, { stiffness: 60, damping: 20 });

  useEffect(() => {
    let placed = false;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      if (!placed) {
        // Appear where the pointer is instead of sweeping in from a corner.
        sx.jump(e.clientX - half);
        sy.jump(e.clientY - half);
        placed = true;
      }
      x.set(e.clientX - half);
      y.set(e.clientY - half);
      opacity.set(1);
    };
    const hide = () => opacity.set(0);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [half, x, y, opacity, sx, sy]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[-1] rounded-full"
      style={{
        // Physical coordinates: clientX/clientY are measured from the
        // top-left corner regardless of text direction.
        top: 0,
        left: 0,
        width: size,
        height: size,
        x: sx,
        y: sy,
        opacity: so,
        backgroundImage: `radial-gradient(closest-side, color-mix(in oklab, ${color} ${Math.round(
          intensity * 100,
        )}%, transparent), transparent)`,
      }}
    />
  );
}
