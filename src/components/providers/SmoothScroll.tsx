"use client";

import { type ReactNode, useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePathname } from "@/i18n/navigation";

/**
 * Scrolls the Lenis viewport to the top whenever the given pathname changes.
 * Must be rendered inside a `<SmoothScroll>` tree (or wherever Lenis' root
 * context is provided) since it relies on `useLenis`.
 */
export function useScrollToTopOnRouteChange(pathname: string) {
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);
}

function LenisGsapBridge() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(onTick);
    };
  }, [lenis]);

  useScrollToTopOnRouteChange(pathname);

  return null;
}

/**
 * Sets up a root Lenis smooth-scroll instance driven by `gsap.ticker` and
 * synced with ScrollTrigger. Entirely disabled under `prefers-reduced-motion`.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ autoRaf: false }}>
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}
