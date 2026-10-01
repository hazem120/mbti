"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query. Hydration-safe: returns `serverValue`
 * (default `false`) on the server and during hydration, then the live value.
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/** True on devices with a precise hover-capable pointer (mouse/trackpad). */
export function useFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

/**
 * True when the user prefers reduced motion. Unlike Motion's
 * `useReducedMotion()` this is hydration-safe (server value `false`), so it
 * may gate *rendered output*; Motion's hook is fine for transitions/handlers.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
