import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";

export interface SectionHeadingProps {
  title: string;
  /** Small uppercase kicker above the title, in the accent colour. */
  eyebrow?: string;
  subtitle?: string;
  /** Heading level. Default `h2`. */
  as?: "h1" | "h2" | "h3";
  /** Default `start`. */
  align?: "start" | "center";
  /** Seconds before the sequence starts. Default `0`. */
  delay?: number;
  /** Animate on mount (e.g. above-the-fold hero) instead of on scroll. */
  immediate?: boolean;
  /** Id for the heading element (for `aria-labelledby`). */
  id?: string;
  className?: string;
  titleClassName?: string;
}

/**
 * Eyebrow + SplitText title + subtitle, revealed in sequence.
 * Server-component safe (composes client motion primitives).
 */
export function SectionHeading({
  title,
  eyebrow,
  subtitle,
  as = "h2",
  align = "start",
  delay = 0,
  immediate = false,
  id,
  className,
  titleClassName,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        centered ? "items-center text-center" : "items-start text-start",
        className,
      )}
    >
      {eyebrow && (
        <Reveal immediate={immediate} delay={delay} distance={12}>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-(--accent) rtl:text-sm rtl:tracking-normal">
            {eyebrow}
          </p>
        </Reveal>
      )}
      <SplitText
        as={as}
        id={id}
        text={title}
        immediate={immediate}
        delay={delay + 0.08}
        className={cn(
          "text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl",
          titleClassName,
        )}
      />
      {subtitle && (
        <Reveal immediate={immediate} delay={delay + 0.3} distance={16}>
          <p
            className={cn(
              "max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg",
              centered && "mx-auto",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
