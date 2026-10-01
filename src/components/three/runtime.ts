import type { Object3D } from "three";

import type { TypeCode } from "@/data/types";

/**
 * Mutable per-frame state shared inside one canvas (held in a ref, never in
 * React state). The camera rig writes it first each frame (negative
 * `useFrame` priority); orbs, lines and stars read it.
 */
export interface SceneRuntime {
  /** World-space anchor of each orb (its floating group), for flights + lines. */
  orbs: Map<TypeCode, Object3D>;
  /** Scene clock in seconds (frozen under reduced motion). */
  time: number;
  /** Phase (radians) of the slow constellation orbit. */
  orbit: number;
  /** Type the camera is flying to, or null. */
  focus: TypeCode | null;
  /** Eased flight progress 0..1 (drives dimming of the other orbs). */
  flight: number;
  /** Starfield warp 0..1. */
  warp: number;
  /** Damped scroll position in viewport heights. */
  scroll: number;
  /** 0..0.75 dimming as the picker scrolls over the scene (keeps cards legible). */
  scrollDim: number;
}

/**
 * Writes runtime fields. Writers go through this helper (rather than
 * assigning to a prop-derived object inline) so the React Compiler lint
 * sees an explicit, out-of-render mutation of a mutable holder.
 */
export function writeRuntime(rt: SceneRuntime, values: Partial<Omit<SceneRuntime, "orbs">>) {
  Object.assign(rt, values);
}

export function createRuntime(): SceneRuntime {
  return {
    orbs: new Map(),
    // Start mid-animation so the static (reduced-motion) frame isn't t = 0.
    time: 8,
    orbit: 0,
    focus: null,
    flight: 0,
    warp: 0,
    scroll: 0,
    scrollDim: 0,
  };
}

/**
 * True when a pointer event's DOM target is real page content (links,
 * buttons, the header, the picker) rather than empty space over the canvas,
 * so canvas hover never fights the DOM UI layered above it.
 */
export function isOverContent(e: Event): boolean {
  const target = e.target;
  if (!(target instanceof Element)) return false;
  return (
    target.closest(
      'a, button, input, select, textarea, [role="button"], header, [data-scene-occlude]',
    ) !== null
  );
}
