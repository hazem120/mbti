"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { AnimatePresence, LayoutGroup, MotionConfig, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import type { Temperament, TypeCode } from "@/data/types";
import { useRouter } from "@/i18n/navigation";
import { isPlainPrimaryClick } from "@/lib/clickIntent";
import { createSelectionController, type SelectionController } from "@/lib/selectionController";
import { setMyType } from "@/lib/useMyType";
import { useSceneStore } from "@/lib/sceneStore";
import { useDir } from "@/lib/useDir";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SectionHeading } from "@/components/visual/SectionHeading";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { TypeCard, type CardState, type PickerItem } from "@/components/home/TypeCard";

export type { PickerItem } from "@/components/home/TypeCard";

export interface PickerTemperament {
  key: Temperament;
  name: string;
  description: string;
  /** Temperament colour (from `TEMPERAMENT_COLORS`). */
  color: string;
}

export interface TypePickerProps {
  /** Section id (the hero CTA scrolls here). */
  id: string;
  items: readonly PickerItem[];
  temperaments: readonly PickerTemperament[];
}

type Filter = "all" | Temperament;

/** Navigate this long after a selection if the camera hasn't arrived yet. */
const NAV_TIMEOUT_MS = 700;
/** If navigation hasn't unmounted the picker by then, undo the flight state. */
const SETTLE_MS = 2000;

const GRID = "grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-4";

/**
 * The 16-type picker: temperament filter (ToggleGroup with a gliding pill),
 * four temperament sections that reflow with Motion layout animations, and
 * the selection flow — choosing a card stores it as "my type", flies the
 * cosmos camera into its orb, then navigates to the type hub on arrival or
 * after 700ms, whichever comes first (immediately under reduced motion).
 */
export function TypePicker({ id, items, temperaments }: TypePickerProps) {
  const t = useTranslations("home.picker");
  const router = useRouter();
  const reduce = useReducedMotion();
  const rtl = useDir() === "rtl";
  const [filter, setFilter] = useState<Filter>("all");
  const [chosen, setChosen] = useState<TypeCode | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SelectionController<TypeCode> | null>(null);

  // Ordering rules (guard before persisting, reduced-motion bypass, arrival
  // vs timeout, settle) live in the unit-tested controller. It is created in
  // an effect (refs are only touched outside render) and disposed on unmount.
  useEffect(() => {
    const controller = createSelectionController<TypeCode>({
      persist: setMyType,
      prefersReducedMotion: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      startFlight: (code) => {
        setChosen(code);
        const scene = useSceneStore.getState();
        scene.setHovered(null);
        scene.setFlyingTo(code);
      },
      subscribeArrival: (code, onArrive) =>
        useSceneStore.subscribe((s) => {
          if (s.arrived === code) onArrive();
        }),
      navigate: (code) => router.push(`/types/${code.toLowerCase()}`),
      // Navigation didn't unmount us (e.g. it failed): restore the picker.
      onSettle: () => {
        setChosen(null);
        useSceneStore.getState().reset();
      },
      timeoutMs: NAV_TIMEOUT_MS,
      settleMs: SETTLE_MS,
    });
    controllerRef.current = controller;
    // Leaving the landing (or unmounting mid-flight): stop listening, reset the scene.
    return () => {
      controller.dispose();
      controllerRef.current = null;
      useSceneStore.getState().reset();
    };
  }, [router]);

  const choose = useCallback((e: MouseEvent<HTMLAnchorElement>, code: TypeCode) => {
    // Cmd/ctrl/shift/alt or non-primary clicks: plain link behaviour (new tab etc.).
    if (!isPlainPrimaryClick(e)) return;
    // Not mounted yet: plain link navigation.
    const controller = controllerRef.current;
    if (!controller) return;
    // "native" (reduced motion): let the <Link> navigate right away.
    // "flying" / "ignored": we navigate (or already are) after the flight.
    if (controller.choose(code) !== "native") e.preventDefault();
  }, []);

  const onFilter = (value: Filter[]) => {
    const next = value[0];
    // Single-select: ignore the "unpress" of the active item.
    if (!next || next === filter) return;
    setFilter(next);
    // If the grid top has scrolled away, bring it back so the reflow is seen.
    const grid = gridRef.current;
    if (grid && grid.getBoundingClientRect().top < 0) {
      const header = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      window.scrollTo({
        top: grid.getBoundingClientRect().top + window.scrollY - header - 96,
        behavior: reduce ? "auto" : "smooth",
      });
    }
  };

  const visible = filter === "all" ? temperaments : temperaments.filter((tm) => tm.key === filter);
  const showHeaders = filter === "all";
  const filterOptions: { value: Filter; label: string; color?: string }[] = [
    { value: "all", label: t("all") },
    ...temperaments.map((tm) => ({
      value: tm.key,
      label: tm.name,
      color: tm.color,
    })),
  ];

  const cardState = (code: TypeCode): CardState =>
    chosen === null ? "idle" : chosen === code ? "chosen" : "dimmed";

  return (
    <MotionConfig reducedMotion="user">
      <section
        id={id}
        tabIndex={-1}
        aria-labelledby={`${id}-title`}
        data-scene-occlude
        className="relative mx-auto max-w-6xl scroll-mt-20 px-4 pt-24 pb-32 outline-none sm:px-6"
      >
        <motion.div
          animate={{ opacity: chosen ? 0.12 : 1 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        >
          <SectionHeading
            id={`${id}-title`}
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            align="center"
          />
        </motion.div>

        {/* Sticky filter, under the sticky header. */}
        <motion.div
          className="sticky top-[4.5rem] z-20 mt-10 flex justify-center"
          animate={{ opacity: chosen ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <LayoutGroup id="temperament-filter">
            <ToggleGroup
              value={[filter]}
              onValueChange={(v) => onFilter(v as Filter[])}
              aria-label={t("filterLabel")}
              spacing={1}
              className="glass max-w-full flex-wrap justify-center rounded-full p-1 shadow-[0_8px_32px_-12px_rgb(0_0_0/0.6)]"
            >
              {filterOptions.map((opt) => {
                const active = filter === opt.value;
                return (
                  <ToggleGroupItem
                    key={opt.value}
                    value={opt.value}
                    style={opt.color ? ({ "--accent": opt.color } as CSSProperties) : undefined}
                    className="relative isolate h-9 gap-2 rounded-full! px-3.5 text-sm text-muted-foreground transition-colors duration-300 hover:bg-transparent! hover:text-fg focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-(--accent) aria-pressed:bg-transparent! aria-pressed:text-fg sm:px-4"
                  >
                    {active && (
                      <motion.span
                        layoutId="temperament-pill"
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-full border border-[color-mix(in_oklab,var(--accent)_45%,transparent)] bg-[color-mix(in_oklab,var(--accent)_20%,transparent)] shadow-[0_0_24px_-6px_var(--accent)]"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                      />
                    )}
                    {opt.color && (
                      <span
                        aria-hidden
                        className="size-1.5 rounded-full bg-(--accent) shadow-[0_0_8px_1px_var(--accent)]"
                      />
                    )}
                    {opt.label}
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </LayoutGroup>
        </motion.div>

        <div ref={gridRef} className="mt-8">
          <LayoutGroup id="picker-grid">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((tm) => {
                const groupItems = items.filter((item) => item.temperament === tm.key);
                return (
                  <motion.section
                    key={tm.key}
                    layout="position"
                    aria-labelledby={`${id}-${tm.key}`}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                    style={{ "--accent": tm.color } as CSSProperties}
                    className="pt-10 first:pt-4"
                  >
                    <AnimatePresence initial={false}>
                      {showHeaders ? (
                        <motion.header
                          key="header"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: chosen ? 0.12 : 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="mb-6 flex flex-col gap-2"
                        >
                          <div className="flex items-center gap-4">
                            <h3
                              id={`${id}-${tm.key}`}
                              className="text-xl font-semibold text-(--accent) sm:text-2xl"
                            >
                              {tm.name}
                            </h3>
                            <span
                              translate="no"
                              className="font-display text-xs tracking-[0.2em] text-muted-foreground"
                            >
                              {tm.key}
                            </span>
                            <motion.span
                              aria-hidden
                              className="h-px flex-1 bg-linear-to-r from-(--accent) to-transparent rtl:bg-linear-to-l"
                              style={{ originX: rtl ? 1 : 0 }}
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              viewport={{ once: true, amount: 1 }}
                              transition={{
                                duration: 1.2,
                                ease: EASE_OUT_EXPO,
                              }}
                            />
                          </div>
                          <p className="max-w-2xl text-sm text-pretty text-muted-foreground sm:text-base">
                            {tm.description}
                          </p>
                        </motion.header>
                      ) : (
                        <h3 key="sr" id={`${id}-${tm.key}`} className="sr-only">
                          {tm.name}
                        </h3>
                      )}
                    </AnimatePresence>

                    <div className={GRID}>
                      {groupItems.map((item, i) => (
                        <motion.div key={item.code} layout="position" className="h-full">
                          <TypeCard
                            item={item}
                            index={i}
                            state={cardState(item.code)}
                            ariaLabel={t("cardAria", {
                              code: item.code,
                              nickname: item.nickname,
                            })}
                            exploreLabel={t("explore")}
                            onChoose={choose}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                );
              })}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </section>
    </MotionConfig>
  );
}
