import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createSelectionController, type SelectionDeps } from "@/lib/selectionController";

type Code = "INFJ" | "ESTP";

function setup(overrides: Partial<SelectionDeps<Code>> = {}) {
  const arrivals = new Map<Code, () => void>();
  const deps = {
    persist: vi.fn<(c: Code) => void>(),
    prefersReducedMotion: vi.fn(() => false),
    startFlight: vi.fn<(c: Code) => void>(),
    navigate: vi.fn<(c: Code) => void>(),
    onSettle: vi.fn(),
    subscribeArrival: vi.fn((code: Code, cb: () => void) => {
      arrivals.set(code, cb);
      return () => arrivals.delete(code);
    }),
    timeoutMs: 700,
    settleMs: 1500,
    ...overrides,
  };
  const controller = createSelectionController<Code>(deps);
  const arrive = (code: Code) => arrivals.get(code)?.();
  return { deps, controller, arrive, arrivals };
}

describe("createSelectionController", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("persists, starts the flight and navigates after the timeout", () => {
    const { deps, controller } = setup();
    expect(controller.choose("INFJ")).toBe("flying");
    expect(deps.persist).toHaveBeenCalledWith("INFJ");
    expect(deps.startFlight).toHaveBeenCalledWith("INFJ");
    vi.advanceTimersByTime(699);
    expect(deps.navigate).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(deps.navigate).toHaveBeenCalledExactlyOnceWith("INFJ");
  });

  it("navigates on arrival when it comes before the timeout, exactly once", () => {
    const { deps, controller, arrive, arrivals } = setup();
    controller.choose("INFJ");
    vi.advanceTimersByTime(300);
    arrive("INFJ");
    expect(deps.navigate).toHaveBeenCalledExactlyOnceWith("INFJ");
    expect(arrivals.size).toBe(0); // unsubscribed
    vi.advanceTimersByTime(1000); // the timeout no longer fires
    expect(deps.navigate).toHaveBeenCalledTimes(1);
  });

  it("ignores a second choice during a flight and does not persist it", () => {
    const { deps, controller } = setup();
    controller.choose("INFJ");
    expect(controller.choose("ESTP")).toBe("ignored");
    expect(deps.persist).toHaveBeenCalledTimes(1);
    expect(deps.persist).toHaveBeenLastCalledWith("INFJ");
    expect(deps.startFlight).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(700);
    expect(deps.navigate).toHaveBeenCalledExactlyOnceWith("INFJ");
  });

  it("keeps ignoring choices after navigating until it settles", () => {
    const { deps, controller } = setup();
    controller.choose("INFJ");
    vi.advanceTimersByTime(700);
    expect(controller.choose("ESTP")).toBe("ignored");
    expect(deps.persist).toHaveBeenCalledTimes(1);
  });

  it("settles if still alive after navigating, then accepts a new choice", () => {
    const { deps, controller } = setup();
    controller.choose("INFJ");
    vi.advanceTimersByTime(700);
    expect(controller.pending()).toBe("INFJ");
    vi.advanceTimersByTime(1500);
    expect(deps.onSettle).toHaveBeenCalledOnce();
    expect(controller.pending()).toBeNull();
    expect(controller.choose("ESTP")).toBe("flying");
    expect(deps.persist).toHaveBeenLastCalledWith("ESTP");
  });

  it("reduced motion: persists and defers to native navigation, no flight", () => {
    const { deps, controller } = setup({ prefersReducedMotion: () => true });
    expect(controller.choose("ESTP")).toBe("native");
    expect(deps.persist).toHaveBeenCalledWith("ESTP");
    expect(deps.startFlight).not.toHaveBeenCalled();
    expect(deps.subscribeArrival).not.toHaveBeenCalled();
    vi.advanceTimersByTime(5000);
    expect(deps.navigate).not.toHaveBeenCalled();
    // Nothing pending, so the next choice is honoured too.
    expect(controller.choose("INFJ")).toBe("native");
    expect(deps.persist).toHaveBeenLastCalledWith("INFJ");
  });

  it("dispose cancels the pending navigation and arrival subscription", () => {
    const { deps, controller, arrive, arrivals } = setup();
    controller.choose("INFJ");
    controller.dispose();
    expect(arrivals.size).toBe(0);
    arrive("INFJ");
    vi.advanceTimersByTime(5000);
    expect(deps.navigate).not.toHaveBeenCalled();
    expect(deps.onSettle).not.toHaveBeenCalled();
    expect(controller.pending()).toBeNull();
  });
});
