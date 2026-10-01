/**
 * The picker's selection flow as a framework-free state machine, so the
 * ordering rules are unit-testable:
 *
 * 1. While a flight is pending, further choices are ignored and NOT
 *    persisted (the app is about to open the first choice's hub).
 * 2. A choice is persisted as "my type" before anything else happens.
 * 3. Under reduced motion it stops there: the caller lets the link
 *    navigate natively (no flight).
 * 4. Otherwise it starts the flight and navigates on arrival or after
 *    `timeoutMs`, whichever comes first (exactly once).
 * 5. If navigation doesn't unmount the caller (e.g. it failed), the
 *    controller settles after `settleMs`: pending clears, `onSettle` runs.
 */

export type ChooseResult =
  /** Persisted; let the browser/link navigate (reduced motion). */
  | "native"
  /** Persisted, flight started; caller must prevent the default navigation. */
  | "flying"
  /** A flight is already pending; nothing changed, prevent the default. */
  | "ignored";

export interface SelectionDeps<C extends string> {
  persist: (code: C) => void;
  prefersReducedMotion: () => boolean;
  startFlight: (code: C) => void;
  /** Calls `onArrive` once the scene reports arrival at `code`; returns unsubscribe. */
  subscribeArrival: (code: C, onArrive: () => void) => () => void;
  navigate: (code: C) => void;
  /** Runs if the caller is still mounted `settleMs` after navigating. */
  onSettle?: () => void;
  timeoutMs: number;
  settleMs: number;
}

export interface SelectionController<C extends string> {
  choose: (code: C) => ChooseResult;
  /** The code of the pending flight, if any. */
  pending: () => C | null;
  /** Clears every timer/subscription (call on unmount). */
  dispose: () => void;
}

export function createSelectionController<C extends string>(
  deps: SelectionDeps<C>,
): SelectionController<C> {
  let pendingCode: C | null = null;
  let navTimer: ReturnType<typeof setTimeout> | null = null;
  let settleTimer: ReturnType<typeof setTimeout> | null = null;
  let unsubscribe: (() => void) | null = null;

  const clearFlight = () => {
    if (navTimer !== null) clearTimeout(navTimer);
    navTimer = null;
    unsubscribe?.();
    unsubscribe = null;
  };

  const dispose = () => {
    clearFlight();
    if (settleTimer !== null) clearTimeout(settleTimer);
    settleTimer = null;
    pendingCode = null;
  };

  const choose = (code: C): ChooseResult => {
    if (pendingCode !== null) return "ignored";

    deps.persist(code);
    if (deps.prefersReducedMotion()) return "native";

    pendingCode = code;
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      clearFlight();
      deps.navigate(code);
      settleTimer = setTimeout(() => {
        settleTimer = null;
        pendingCode = null;
        deps.onSettle?.();
      }, deps.settleMs);
    };

    deps.startFlight(code);
    navTimer = setTimeout(go, deps.timeoutMs);
    unsubscribe = deps.subscribeArrival(code, go);
    return "flying";
  };

  return { choose, pending: () => pendingCode, dispose };
}
