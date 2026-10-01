"use client";

import type { MouseEvent } from "react";
import { ArrowDown } from "lucide-react";
import { useLenis } from "lenis/react";

import { Magnetic } from "@/components/motion/Magnetic";
import { isPlainPrimaryClick } from "@/lib/clickIntent";

export interface HeroCtaProps {
  label: string;
  /** Id of the section to scroll to. */
  targetId: string;
}

/** Expo-out, matching the kit's `EASE_OUT_EXPO` feel for Lenis. */
const expoOut = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * The hero's primary action: a magnetic pill with a turning aurora ring
 * that glides (Lenis) to the picker and moves keyboard focus there. A real
 * `#anchor` link, so it works before hydration and without JS.
 */
export function HeroCta({ label, targetId }: HeroCtaProps) {
  const lenis = useLenis();

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById(targetId);
    if (!target || !isPlainPrimaryClick(e)) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const header = document.querySelector("header");
    const offset = -((header?.getBoundingClientRect().height ?? 0) + 8);

    if (lenis && !reduce) {
      lenis.scrollTo(target, { offset, duration: 1.6, easing: expoOut });
    } else {
      const top = target.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    }
    // Keyboard and screen-reader users land where the eye goes.
    target.focus({ preventScroll: true });
  }

  return (
    <Magnetic strength={0.28} radius={50}>
      <span className="group relative isolate inline-flex rounded-full">
        <span aria-hidden className="cta-aurora cta-aurora-blur" />
        <span aria-hidden className="cta-aurora" />
        <a
          href={`#${targetId}`}
          onClick={onClick}
          className="relative inline-flex items-center gap-2.5 rounded-full bg-bg/90 px-7 py-3.5 text-base font-semibold text-fg transition-colors duration-300 hover:bg-bg/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
        >
          {label}
          <ArrowDown
            aria-hidden
            className="size-4 transition-transform duration-500 ease-out group-hover:translate-y-0.5"
          />
        </a>
      </span>
    </Magnetic>
  );
}
