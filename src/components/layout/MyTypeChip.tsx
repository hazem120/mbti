"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { useMyType } from "@/lib/useMyType";
import { TypeBadge } from "@/components/visual/TypeBadge";
import { REDUCED_TRANSITION } from "@/components/motion/easing";

/**
 * Header chip showing the user's chosen type ("You: INFJ"), linking to its
 * hub. Renders nothing on the server / until a type is chosen (the
 * `useMyType` server snapshot is `null`), so there is no hydration mismatch.
 */
export function MyTypeChip() {
  const { myType } = useMyType();
  const reduce = useReducedMotion();
  const t = useTranslations("myType");

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {myType && (
        <motion.div
          key={myType}
          initial={{ opacity: 0, scale: 0.6, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.6, filter: "blur(6px)" }}
          transition={
            reduce ? REDUCED_TRANSITION : { type: "spring", stiffness: 420, damping: 26 }
          }
        >
          <Link
            href={`/types/${myType.toLowerCase()}`}
            aria-label={t("chipAria", { code: myType })}
            className="block rounded-full transition-[filter] hover:brightness-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)"
          >
            <TypeBadge code={myType} label={t("you")} size="sm" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
