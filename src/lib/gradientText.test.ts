import { describe, expect, it } from "vitest";

import { colorAt, unitGradients } from "@/lib/gradientText";

const STOPS = ["var(--a)", "var(--b)", "var(--c)"] as const;

describe("colorAt", () => {
  it("returns exact stops at their positions", () => {
    expect(colorAt(STOPS, 0)).toBe("var(--a)");
    expect(colorAt(STOPS, 0.5)).toBe("var(--b)");
    expect(colorAt(STOPS, 1)).toBe("var(--c)");
  });

  it("mixes between neighbouring stops", () => {
    expect(colorAt(STOPS, 0.25)).toBe("color-mix(in oklab, var(--a) 50%, var(--b))");
    expect(colorAt(STOPS, 0.75)).toBe("color-mix(in oklab, var(--b) 50%, var(--c))");
  });

  it("clamps and handles degenerate stop lists", () => {
    expect(colorAt(STOPS, -1)).toBe("var(--a)");
    expect(colorAt(STOPS, 9)).toBe("var(--c)");
    expect(colorAt(["red"], 0.4)).toBe("red");
    expect(colorAt([], 0.4)).toBe("currentColor");
  });
});

describe("unitGradients", () => {
  it("gives each unit a contiguous, length-weighted slice", () => {
    const [first, second] = unitGradients([1, 1], ["var(--a)", "var(--c)"]);
    expect(first).toBe(
      "linear-gradient(90deg, var(--a), color-mix(in oklab, var(--a) 50%, var(--c)))",
    );
    expect(second).toBe(
      "linear-gradient(90deg, color-mix(in oklab, var(--a) 50%, var(--c)), var(--c))",
    );
  });

  it("flips direction under RTL", () => {
    const [only] = unitGradients([3], STOPS, true);
    expect(only).toBe("linear-gradient(270deg, var(--a), var(--c))");
  });
});
