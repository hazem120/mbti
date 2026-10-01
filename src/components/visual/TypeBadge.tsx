import type { ReactNode } from "react";

import { TYPES, type Temperament, type TypeCode } from "@/data/types";
import { cn } from "@/lib/utils";

// Literal class names so Tailwind can see them; colours come from tokens.
const DOT: Record<Temperament, string> = {
  NT: "bg-nt text-nt",
  NF: "bg-nf text-nf",
  SJ: "bg-sj text-sj",
  SP: "bg-sp text-sp",
};

const SIZES = {
  sm: { root: "gap-1.5 px-2.5 py-0.5 text-xs", dot: "size-1.5" },
  md: { root: "gap-2 px-3 py-1 text-sm", dot: "size-2" },
  lg: { root: "gap-2.5 px-4 py-1.5 text-base", dot: "size-2.5" },
} as const;

export interface TypeBadgeProps {
  code: TypeCode;
  /** Optional prefix, e.g. a localized "You:". */
  label?: ReactNode;
  /** Default `md`. */
  size?: keyof typeof SIZES;
  className?: string;
}

/**
 * Pill with a temperament-coloured dot and the type code in the display
 * font. Presentational and server-component safe — wrap it in a `Link` or
 * button for interactivity.
 */
export function TypeBadge({ code, label, size = "md", className }: TypeBadgeProps) {
  const sizing = SIZES[size];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface leading-none text-fg backdrop-blur-md",
        sizing.root,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "shrink-0 rounded-full shadow-[0_0_10px_1px_currentColor]",
          sizing.dot,
          DOT[TYPES[code].temperament],
        )}
      />
      {label != null && <span className="text-muted-foreground">{label}</span>}
      <span translate="no" className="font-display font-semibold tracking-wider">
        {code}
      </span>
    </span>
  );
}
