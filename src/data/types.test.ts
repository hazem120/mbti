import { describe, expect, it } from "vitest";

import {
  TEMPERAMENTS,
  TEMPERAMENT_COLORS,
  TYPE_CODES,
  TYPES,
  parseTypeCode,
  typesByTemperament,
  typesWithFunctionAt,
} from "@/data/types";

describe("TYPE_CODES", () => {
  it("lists all sixteen types grouped NT, NF, SJ, SP", () => {
    expect(TYPE_CODES).toEqual([
      "INTJ",
      "INTP",
      "ENTJ",
      "ENTP",
      "INFJ",
      "INFP",
      "ENFJ",
      "ENFP",
      "ISTJ",
      "ISFJ",
      "ESTJ",
      "ESFJ",
      "ISTP",
      "ISFP",
      "ESTP",
      "ESFP",
    ]);
  });
});

describe("TYPES", () => {
  it("has the correct stack and accent for every type", () => {
    expect(TYPES.INTJ).toEqual({
      code: "INTJ",
      temperament: "NT",
      stack: ["Ni", "Te", "Fi", "Se"],
      accent: "#8b5cf6",
    });
    expect(TYPES.INFJ).toEqual({
      code: "INFJ",
      temperament: "NF",
      stack: ["Ni", "Fe", "Ti", "Se"],
      accent: "#10b981",
    });
    expect(TYPES.ISTJ).toEqual({
      code: "ISTJ",
      temperament: "SJ",
      stack: ["Si", "Te", "Fi", "Ne"],
      accent: "#3b82f6",
    });
    expect(TYPES.ISTP).toEqual({
      code: "ISTP",
      temperament: "SP",
      stack: ["Ti", "Se", "Ni", "Fe"],
      accent: "#f59e0b",
    });
    expect(TYPES.ENTP.stack).toEqual(["Ne", "Ti", "Fe", "Si"]);
    expect(TYPES.ESFP.stack).toEqual(["Se", "Fi", "Te", "Ni"]);
  });

  it("has every TYPE_CODES entry present with a matching code field", () => {
    for (const code of TYPE_CODES) {
      expect(TYPES[code].code).toBe(code);
    }
  });
});

describe("TEMPERAMENTS / TEMPERAMENT_COLORS", () => {
  it("lists temperaments in order NT, NF, SJ, SP", () => {
    expect(TEMPERAMENTS).toEqual(["NT", "NF", "SJ", "SP"]);
  });

  it("has a color for every temperament", () => {
    for (const t of TEMPERAMENTS) {
      expect(TEMPERAMENT_COLORS[t]).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
});

describe("parseTypeCode", () => {
  it("is case-insensitive", () => {
    expect(parseTypeCode("infj")).toBe("INFJ");
    expect(parseTypeCode("InFj")).toBe("INFJ");
    expect(parseTypeCode("ENTP")).toBe("ENTP");
  });

  it("returns null for anything that isn't a real type code", () => {
    expect(parseTypeCode("xxxx")).toBeNull();
    expect(parseTypeCode("")).toBeNull();
    expect(parseTypeCode("INF")).toBeNull();
  });
});

describe("typesByTemperament", () => {
  it("returns the four types for a temperament in TYPE_CODES order", () => {
    expect(typesByTemperament("NT")).toEqual(["INTJ", "INTP", "ENTJ", "ENTP"]);
    expect(typesByTemperament("SP")).toEqual(["ISTP", "ISFP", "ESTP", "ESFP"]);
  });
});

describe("typesWithFunctionAt", () => {
  it("returns every type whose stack has the given function at the given position", () => {
    expect(typesWithFunctionAt("Ni", 0)).toEqual(["INTJ", "INFJ"]);
  });

  it("finds inferior Fe for Ti-dominant types", () => {
    const withInferiorFe = typesWithFunctionAt("Fe", 3);
    expect(withInferiorFe).toContain("ISTP");
    expect(withInferiorFe).toContain("INTP");
  });
});
