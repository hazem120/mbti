import { describe, expect, it } from "vitest";

import { functionStrengths } from "@/data/strengths";

describe("functionStrengths", () => {
  it("matches the worked example for INFJ", () => {
    expect(functionStrengths("INFJ")).toEqual({
      Ni: 100,
      Fe: 80,
      Ti: 55,
      Se: 30,
      Ne: 45,
      Fi: 35,
      Te: 25,
      Si: 15,
    });
  });

  it("gives every function code a strength for every type", () => {
    const strengths = functionStrengths("ENTP");
    for (const code of ["Ni", "Ne", "Si", "Se", "Ti", "Te", "Fi", "Fe"] as const) {
      expect(typeof strengths[code]).toBe("number");
    }
  });
});
