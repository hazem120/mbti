import type { CSSProperties, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { SpotlightBorder } from "@/components/motion/SpotlightBorder";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Add the cursor-following SpotlightBorder glow. Default `false`. */
  spotlight?: boolean;
  /** Spotlight diameter in px (with `spotlight`). Default `380`. */
  spotlightSize?: number;
  /**
   * Scopes `--accent` to this card (drives spotlight colour, focus rings,
   * `.text-gradient` inside). Any CSS colour, e.g. `TYPES.INFJ.accent`.
   */
  accent?: string;
}

/**
 * The `.glass` surface as a rounded card (default padding `p-6`, override via
 * `className`). Server-component safe; with `spotlight` it renders the
 * client `SpotlightBorder` as its root element.
 */
export function GlassCard({
  spotlight = false,
  spotlightSize,
  accent,
  className,
  style,
  children,
  ...rest
}: GlassCardProps) {
  const classes = cn("glass rounded-2xl p-6", className);
  const merged = accent ? ({ "--accent": accent, ...style } as CSSProperties) : style;

  if (spotlight) {
    return (
      <SpotlightBorder {...rest} size={spotlightSize} className={classes} style={merged}>
        {children}
      </SpotlightBorder>
    );
  }

  return (
    <div {...rest} className={classes} style={merged}>
      {children}
    </div>
  );
}
