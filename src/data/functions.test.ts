import { describe, expect, it } from "vitest";

import {
  FUNCTION_CODES,
  FUNCTIONS,
  flipAttitude,
  parseFunctionCode,
  partnerElement,
} from "@/data/functions";

describe("FUNCTION_CODES", () => {
  it("lists all eight functions in order", () => {
    expect(FUNCTION_CODES).toEqual(["Ni", "Ne", "Si", "Se", "Ti", "Te", "Fi", "Fe"]);
  });
});

describe("FUNCTIONS", () => {
  it("has metadata with correct element/attitude/kind/color for every code", () => {
    expect(FUNCTIONS.Ni).toEqual({
      code: "Ni",
      element: "N",
      attitude: "i",
      kind: "perceiving",
      color: "#c084fc",
    });
    expect(FUNCTIONS.Ne).toMatchObject({ element: "N", attitude: "e", kind: "perceiving", color: "#f472b6" });
    expect(FUNCTIONS.Si).toMatchObject({ element: "S", attitude: "i", kind: "perceiving", color: "#60a5fa" });
    expect(FUNCTIONS.Se).toMatchObject({ element: "S", attitude: "e", kind: "perceiving", color: "#fb923c" });
    expect(FUNCTIONS.Ti).toMatchObject({ element: "T", attitude: "i", kind: "judging", color: "#22d3ee" });
    expect(FUNCTIONS.Te).toMatchObject({ element: "T", attitude: "e", kind: "judging", color: "#facc15" });
    expect(FUNCTIONS.Fi).toMatchObject({ element: "F", attitude: "i", kind: "judging", color: "#fb7185" });
    expect(FUNCTIONS.Fe).toMatchObject({ element: "F", attitude: "e", kind: "judging", color: "#4ade80" });
  });

  it("has every FUNCTION_CODES entry present as a key with a matching code field", () => {
    for (const code of FUNCTION_CODES) {
      expect(FUNCTIONS[code].code).toBe(code);
    }
  });
});

describe("flipAttitude", () => {
  it("flips introverted functions to their extroverted counterpart and vice versa", () => {
    expect(flipAttitude("Ni")).toBe("Ne");
    expect(flipAttitude("Ne")).toBe("Ni");
    expect(flipAttitude("Si")).toBe("Se");
    expect(flipAttitude("Se")).toBe("Si");
    expect(flipAttitude("Ti")).toBe("Te");
    expect(flipAttitude("Te")).toBe("Ti");
    expect(flipAttitude("Fi")).toBe("Fe");
    expect(flipAttitude("Fe")).toBe("Fi");
  });
});

describe("partnerElement", () => {
  it("keeps the attitude and pairs N<->S, T<->F", () => {
    expect(partnerElement("Ni")).toBe("Si");
    expect(partnerElement("Si")).toBe("Ni");
    expect(partnerElement("Ne")).toBe("Se");
    expect(partnerElement("Se")).toBe("Ne");
    expect(partnerElement("Te")).toBe("Fe");
    expect(partnerElement("Fe")).toBe("Te");
    expect(partnerElement("Ti")).toBe("Fi");
    expect(partnerElement("Fi")).toBe("Ti");
  });
});

describe("parseFunctionCode", () => {
  it("is case-insensitive and normalizes to canonical casing", () => {
    expect(parseFunctionCode("ni")).toBe("Ni");
    expect(parseFunctionCode("NI")).toBe("Ni");
    expect(parseFunctionCode("Ni")).toBe("Ni");
    expect(parseFunctionCode("fE")).toBe("Fe");
  });

  it("returns null for anything that isn't a real function code", () => {
    expect(parseFunctionCode("xx")).toBeNull();
    expect(parseFunctionCode("")).toBeNull();
    expect(parseFunctionCode("Nx")).toBeNull();
    expect(parseFunctionCode("Nii")).toBeNull();
  });
});
