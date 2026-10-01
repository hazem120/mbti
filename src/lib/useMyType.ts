"use client";

import { useSyncExternalStore } from "react";

import type { TypeCode } from "@/data/types";
import {
  MY_TYPE_EVENT,
  MY_TYPE_KEY,
  buildMyTypeCookie,
  parseMyType,
  serializeMyType,
} from "@/lib/myTypeStorage";

function readStorage(): string | null {
  try {
    return window.localStorage.getItem(MY_TYPE_KEY);
  } catch {
    // Storage can throw (privacy mode, blocked site data).
    return null;
  }
}

function writeCookie(code: TypeCode | null) {
  try {
    document.cookie = buildMyTypeCookie(code, {
      secure: window.location.protocol === "https:",
    });
  } catch {
    // Cookies disabled — localStorage remains the source of truth.
  }
}

function notify() {
  window.dispatchEvent(new Event(MY_TYPE_EVENT));
}

function subscribe(onChange: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    // `key === null` means storage was cleared entirely.
    if (event.key === MY_TYPE_KEY || event.key === null) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(MY_TYPE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(MY_TYPE_EVENT, onChange);
  };
}

// Snapshots are primitives (a TypeCode string or null), so they are stable
// between calls as `useSyncExternalStore` requires.
function getSnapshot(): TypeCode | null {
  return parseMyType(readStorage());
}

function getServerSnapshot(): TypeCode | null {
  return null;
}

/** Persists the chosen type (localStorage + cookie) and notifies subscribers. */
export function setMyType(code: TypeCode): void {
  try {
    window.localStorage.setItem(MY_TYPE_KEY, serializeMyType(code));
  } catch {
    // Ignore — the cookie below still records the choice.
  }
  writeCookie(code);
  notify();
}

/** Forgets the chosen type (localStorage + cookie) and notifies subscribers. */
export function clearMyType(): void {
  try {
    window.localStorage.removeItem(MY_TYPE_KEY);
  } catch {
    // Ignore.
  }
  writeCookie(null);
  notify();
}

export interface UseMyTypeResult {
  /** `null` on the server, during hydration, and when nothing is chosen. */
  myType: TypeCode | null;
  setMyType: (code: TypeCode) => void;
  clearMyType: () => void;
}

/**
 * The user's chosen type, read client-side only. SSR-safe: the server
 * snapshot is `null`, so markup never depends on the stored value until
 * after hydration. Syncs across components (same tab) and across tabs.
 */
export function useMyType(): UseMyTypeResult {
  const myType = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { myType, setMyType, clearMyType };
}
