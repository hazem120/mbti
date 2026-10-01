"use client";

import { type CSSProperties, type HTMLAttributes, type PointerEvent } from "react";

import { cn } from "@/lib/utils";

export interface SpotlightBorderProps extends HTMLAttributes<HTMLDivElement> {
  /** Glow colour (any CSS colour). Default `var(--accent)`. */
  color?: string;
  /** Spotlight diameter in px. Default `380`. */
  size?: number;
  /** Width of the glowing border ring in px. Default `1`. */
  borderWidth?: number;
}

/**
 * A radial glow that follows the cursor across the element's background and
 * lights up its border. The cursor position is written to the `--x`/`--y`
 * CSS variables directly (no React re-render); the glow layers are styled in
 * `globals.css` (`.spotlight*`). Put the border-radius on `className`.
 */
export function SpotlightBorder({
  color,
  size = 380,
  borderWidth = 1,
  className,
  style,
  children,
  onPointerMove,
  ...rest
}: SpotlightBorderProps) {
  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
    onPointerMove?.(e);
  }

  const vars = {
    "--spot-size": `${size}px`,
    "--spot-border": `${borderWidth}px`,
    ...(color ? { "--spot-color": color } : {}),
  } as CSSProperties;

  return (
    <div
      {...rest}
      className={cn("spotlight", className)}
      style={{ ...vars, ...style }}
      onPointerMove={handlePointerMove}
    >
      <span aria-hidden className="spotlight-fill" />
      {children}
      <span aria-hidden className="spotlight-ring" />
    </div>
  );
}
