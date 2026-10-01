import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface GlowOrbProps {
  /** Any CSS colour, e.g. `TYPES.INFJ.accent` or `var(--accent)`. Default `var(--accent)`. */
  color?: string;
  /** Diameter: px number or any CSS length (`"8rem"`, `"min(40vw,320px)"`). Default `96`. */
  size?: number | string;
  /** Glow strength 0–1 (halo opacity + outer bloom). Default `0.7`. */
  intensity?: number;
  /** Breathing + rotating sheen (pure CSS keyframes). Default `true`. */
  animated?: boolean;
  /**
   * Phase offset in seconds so many orbs on one page don't breathe in sync.
   * Applied as a negative animation-delay. Default `0`.
   */
  phase?: number;
  /** Optional centred content (e.g. a type code). Rendered above the orb. */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * A glowing sphere built from four CSS layers — outer halo, radial core,
 * rotating conic sheen, breathing scale — with no WebGL and no JS animation
 * loop, so dozens can share a page. Server-component safe. Styles live in
 * `globals.css` (`.orb*`). Decorative: the orb itself is `aria-hidden`;
 * `children` remain accessible.
 */
export function GlowOrb({
  color,
  size = 96,
  intensity = 0.7,
  animated = true,
  phase = 0,
  children,
  className,
  style,
}: GlowOrbProps) {
  const vars = {
    "--orb-size": typeof size === "number" ? `${size}px` : size,
    "--orb-intensity": String(Math.min(1, Math.max(0, intensity))),
    "--orb-delay": `${-Math.abs(phase)}s`,
    ...(color ? { "--orb-color": color } : {}),
  } as CSSProperties;

  return (
    <span
      className={cn("orb", className)}
      data-animated={animated ? "" : undefined}
      style={{ ...vars, ...style }}
    >
      <span aria-hidden className="orb-body">
        <span className="orb-halo" />
        <span className="orb-core" />
        <span className="orb-sheen" />
      </span>
      {children != null && <span className="orb-content">{children}</span>}
    </span>
  );
}
