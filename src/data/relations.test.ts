import { describe, expect, it } from "vitest";

import { TYPE_CODES } from "@/data/types";
import type { TypeCode } from "@/data/types";
import {
  RELATION_GROUPS,
  RELATION_GROUP_COLORS,
  RELATION_KINDS,
  RELATION_META,
  getRelation,
  getRelationsFor,
  inverseKind,
  modelA,
} from "@/data/relations";

describe("modelA", () => {
  it("matches the worked example for INFJ", () => {
    expect(modelA("INFJ")).toEqual(["Ni", "Fe", "Si", "Te", "Se", "Ti", "Ne", "Fi"]);
  });

  it("matches the worked example for ENTP", () => {
    expect(modelA("ENTP")).toEqual(["Ne", "Ti", "Se", "Fi", "Si", "Fe", "Ni", "Te"]);
  });
});

describe("getRelation starting from INFJ", () => {
  const expected: Record<TypeCode, string> = {
    ESTP: "dual",
    ISTP: "activity",
    ENFJ: "mirror",
    ESTJ: "conflict",
    ISTJ: "superego",
    ENFP: "extinguishment",
    INFP: "quasiIdentity",
    INTJ: "kindred",
    ISFJ: "business",
    ESFP: "semiDual",
    ENTP: "mirage",
    ESFJ: "supervisor",
    ENTJ: "supervisee",
    ISFP: "benefactor",
    INTP: "beneficiary",
    INFJ: "identity",
    // remaining types aren't asserted individually here; distinctness is
    // covered by the "all 16 kinds" test below.
  } as Record<TypeCode, string>;

  for (const [other, kind] of Object.entries(expected)) {
    it(`INFJ/${other} is ${kind}`, () => {
      expect(getRelation("INFJ", other as TypeCode).kind).toBe(kind);
    });
  }
});

describe("getRelation ENTP/ISFJ", () => {
  it("is dual", () => {
    expect(getRelation("ENTP", "ISFJ").kind).toBe("dual");
  });
});

describe("getRelationsFor", () => {
  it("returns all 16 relations (including self) with every kind distinct and covering RELATION_KINDS", () => {
    for (const code of TYPE_CODES) {
      const relations = getRelationsFor(code);
      expect(relations).toHaveLength(16);
      const kinds = relations.map((r) => r.kind);
      expect(new Set(kinds).size).toBe(16);
      expect(new Set(kinds)).toEqual(new Set(RELATION_KINDS));
    }
  });

  it("sorts by score descending, ties broken by TYPE_CODES order", () => {
    for (const code of TYPE_CODES) {
      const relations = getRelationsFor(code);
      for (let i = 1; i < relations.length; i++) {
        const prev = relations[i - 1];
        const cur = relations[i];
        if (prev.score === cur.score) {
          expect(TYPE_CODES.indexOf(prev.b)).toBeLessThan(TYPE_CODES.indexOf(cur.b));
        } else {
          expect(prev.score).toBeGreaterThan(cur.score);
        }
      }
    }
  });
});

describe("relation symmetry", () => {
  it("getRelation(b,a).kind === inverseKind(getRelation(a,b).kind), with equal scores", () => {
    for (const a of TYPE_CODES) {
      for (const b of TYPE_CODES) {
        const ab = getRelation(a, b);
        const ba = getRelation(b, a);
        expect(ba.kind).toBe(inverseKind(ab.kind));
        expect(ba.score).toBe(ab.score);
      }
    }
  });
});

describe("inverseKind", () => {
  it("swaps supervisor/supervisee and benefactor/beneficiary", () => {
    expect(inverseKind("supervisor")).toBe("supervisee");
    expect(inverseKind("supervisee")).toBe("supervisor");
    expect(inverseKind("benefactor")).toBe("beneficiary");
    expect(inverseKind("beneficiary")).toBe("benefactor");
  });

  it("maps every other kind to itself", () => {
    const selfMapped = RELATION_KINDS.filter(
      (k) => !["supervisor", "supervisee", "benefactor", "beneficiary"].includes(k),
    );
    for (const k of selfMapped) {
      expect(inverseKind(k)).toBe(k);
    }
  });
});

describe("sharedFunctions", () => {
  it("is the intersection of both stacks, in a's stack order", () => {
    expect(getRelation("INFJ", "INTJ").sharedFunctions).toEqual(["Ni", "Se"]);
  });
});

describe("RELATION_META", () => {
  it("has the documented score and group for every kind", () => {
    expect(RELATION_META.dual).toEqual({ score: 96, group: "complementary" });
    expect(RELATION_META.activity).toEqual({ score: 88, group: "complementary" });
    expect(RELATION_META.semiDual).toEqual({ score: 80, group: "complementary" });
    expect(RELATION_META.mirage).toEqual({ score: 76, group: "complementary" });
    expect(RELATION_META.mirror).toEqual({ score: 74, group: "similar" });
    expect(RELATION_META.identity).toEqual({ score: 70, group: "similar" });
    expect(RELATION_META.kindred).toEqual({ score: 68, group: "similar" });
    expect(RELATION_META.business).toEqual({ score: 64, group: "similar" });
    expect(RELATION_META.benefactor).toEqual({ score: 58, group: "asymmetric" });
    expect(RELATION_META.beneficiary).toEqual({ score: 58, group: "asymmetric" });
    expect(RELATION_META.extinguishment).toEqual({ score: 52, group: "challenging" });
    expect(RELATION_META.quasiIdentity).toEqual({ score: 46, group: "challenging" });
    expect(RELATION_META.supervisor).toEqual({ score: 38, group: "asymmetric" });
    expect(RELATION_META.supervisee).toEqual({ score: 38, group: "asymmetric" });
    expect(RELATION_META.superego).toEqual({ score: 34, group: "challenging" });
    expect(RELATION_META.conflict).toEqual({ score: 24, group: "challenging" });
  });
});

describe("RELATION_GROUPS / RELATION_GROUP_COLORS", () => {
  it("lists groups in order complementary, similar, asymmetric, challenging", () => {
    expect(RELATION_GROUPS).toEqual(["complementary", "similar", "asymmetric", "challenging"]);
  });

  it("has the documented hex color for every group", () => {
    expect(RELATION_GROUP_COLORS).toEqual({
      complementary: "#5eead4",
      similar: "#a5b4fc",
      asymmetric: "#f0abfc",
      challenging: "#fda4af",
    });
  });
});

describe("RELATION_KINDS", () => {
  it("lists all sixteen kinds in the documented order", () => {
    expect(RELATION_KINDS).toEqual([
      "identity",
      "mirror",
      "dual",
      "activity",
      "superego",
      "conflict",
      "extinguishment",
      "quasiIdentity",
      "kindred",
      "business",
      "semiDual",
      "mirage",
      "supervisor",
      "supervisee",
      "benefactor",
      "beneficiary",
    ]);
  });
});
