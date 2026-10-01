import { create } from "zustand";

import type { TypeCode } from "@/data/types";

/**
 * Scene state shared between DOM UI and the R3F canvas (hover highlights,
 * camera fly-to targets). Client-only usage: read it from client components
 * or from inside the canvas tree. The canvas reads it per frame through
 * `useSceneStore.getState()` (no React re-render).
 */
export interface SceneState {
  hoveredType: TypeCode | null;
  /** Type the camera is flying to (set by the picker on selection). */
  flyingTo: TypeCode | null;
  /** Set by the scene once the camera has reached `flyingTo`. */
  arrived: TypeCode | null;
  setHovered: (code: TypeCode | null) => void;
  /** Starts (or cancels, with `null`) a flight; always clears `arrived`. */
  setFlyingTo: (code: TypeCode | null) => void;
  setArrived: (code: TypeCode | null) => void;
  /** Clears hover and any flight (e.g. when the landing unmounts). */
  reset: () => void;
}

export const useSceneStore = create<SceneState>()((set) => ({
  hoveredType: null,
  flyingTo: null,
  arrived: null,
  setHovered: (hoveredType) => set({ hoveredType }),
  setFlyingTo: (flyingTo) => set({ flyingTo, arrived: null }),
  setArrived: (arrived) => set({ arrived }),
  reset: () => set({ hoveredType: null, flyingTo: null, arrived: null }),
}));
