import { create } from "zustand";

import type { TypeCode } from "@/data/types";

/**
 * Scene state shared between DOM UI and the R3F canvas (hover highlights,
 * camera fly-to targets). Client-only usage: read it from client components
 * or from inside the canvas tree.
 */
export interface SceneState {
  hoveredType: TypeCode | null;
  flyingTo: TypeCode | null;
  setHovered: (code: TypeCode | null) => void;
  setFlyingTo: (code: TypeCode | null) => void;
}

export const useSceneStore = create<SceneState>()((set) => ({
  hoveredType: null,
  flyingTo: null,
  setHovered: (hoveredType) => set({ hoveredType }),
  setFlyingTo: (flyingTo) => set({ flyingTo }),
}));
