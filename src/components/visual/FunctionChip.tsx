import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";

import { FUNCTIONS, type FunctionCode } from "@/data/functions";
import { cn } from "@/lib/utils";

/** Stack positions in order; index with a type's `stack` index. */
export const FUNCTION_POSITIONS = ["dominant", "auxiliary", "tertiary", "inferior"] as const;
export type FunctionPosition = (typeof FUNCTION_POSITIONS)[number];

const SIZES = {
  sm: "gap-1.5 px-2.5 py-0.5 text-xs",
  md: "gap-2 px-3 py-1 text-sm",
} as const;

export interface FunctionChipProps {
  code: FunctionCode;
  /** Adds a localized position label (Dominant / Auxiliary / …). */
  position?: FunctionPosition;
  /** Default `md`. */
  size?: keyof typeof SIZES;
  className?: string;
}

/**
 * A cognitive-function code in its function colour (from `FUNCTIONS`, via
 * the `--fn` CSS variable), optionally with its localized stack position.
 * Works in server and client components (next-intl `useTranslations`).
 */
export function FunctionChip({ code, position, size = "md", className }: FunctionChipProps) {
  const t = useTranslations("type.positions");
  return (
    <span
      style={{ "--fn": FUNCTIONS[code].color } as CSSProperties}
      className={cn(
        "inline-flex items-center rounded-full border leading-none",
        "border-[color-mix(in_oklab,var(--fn)_35%,transparent)] bg-[color-mix(in_oklab,var(--fn)_10%,transparent)]",
        SIZES[size],
        className,
      )}
    >
      <span
        translate="no"
        className="font-display font-semibold text-(--fn) [text-shadow:0_0_12px_color-mix(in_oklab,var(--fn)_60%,transparent)]"
      >
        {code}
      </span>
      {position && <span className="text-muted-foreground">{t(position)}</span>}
    </span>
  );
}
