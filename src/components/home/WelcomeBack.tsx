"use client";

import type { CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { TYPES } from "@/data/types";
import { Link } from "@/i18n/navigation";
import { useMyType } from "@/lib/useMyType";
import { useSceneStore } from "@/lib/sceneStore";
import { GlowOrb } from "@/components/visual/GlowOrb";
import { EASE_OUT_EXPO, REDUCED_TRANSITION } from "@/components/motion/easing";

/**
 * For returning visitors: a floating glass chip — orb, "Welcome back, INFJ —
 * continue exploring →" — linking to their type. Client-only by nature (the
 * stored type has a `null` server snapshot), so it never affects SSR markup;
 * it is `fixed`, so appearing after hydration causes no layout shift.
 * Hidden while a selection flight is running. (No `filter` animation: it
 * would make the wrapper a backdrop root and kill the glass blur.)
 */
export function WelcomeBack() {
  const { myType } = useMyType();
  const flying = useSceneStore((s) => s.flyingTo !== null);
  const reduce = useReducedMotion();
  const t = useTranslations("home");

  const show = myType !== null && !flying;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-30 flex justify-center px-4 sm:justify-end sm:px-6">
      <AnimatePresence>
        {show && (
          <motion.div
            key={myType}
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={
              reduce ? { ...REDUCED_TRANSITION, delay: 0.6 } : { duration: 0.9, delay: 1.6, ease: EASE_OUT_EXPO }
            }
            className="pointer-events-auto"
            style={{ "--accent": TYPES[myType].accent } as CSSProperties}
          >
            <Link
              href={`/types/${myType.toLowerCase()}`}
              aria-label={t("welcomeBackAria", { code: myType })}
              className="group float-soft glass flex items-center gap-3 rounded-full py-2 ps-2 pe-4 text-sm shadow-[0_10px_40px_-12px_var(--accent)] transition-[filter] hover:brightness-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)"
            >
              <GlowOrb size={30} intensity={0.85} />
              <span className="text-fg">
                {t("welcomeBack", { code: myType })}
                <span className="text-muted-foreground"> — {t("continueExploring")}</span>
              </span>
              <ArrowRight
                aria-hidden
                className="size-4 text-(--accent) transition-transform duration-300 rtl:-scale-x-100 ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
              />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
