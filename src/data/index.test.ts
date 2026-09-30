import { describe, expect, it } from "vitest";

import * as data from "@/data";

describe("barrel exports", () => {
  it("re-exports every value symbol tasks 3+ depend on", () => {
    const expectedValues = [
      "getRelation",
      "getRelationsFor",
      "functionStrengths",
      "TYPES",
      "FUNCTIONS",
      "parseTypeCode",
      "parseFunctionCode",
      "RELATION_META",
      "inverseKind",
      "typesWithFunctionAt",
      "typesByTemperament",
      "RELATION_GROUPS",
      "RELATION_GROUP_COLORS",
      "TYPE_CODES",
      "FUNCTION_CODES",
      "RELATION_KINDS",
      "TEMPERAMENTS",
      "TEMPERAMENT_COLORS",
    ];
    for (const name of expectedValues) {
      expect(data as Record<string, unknown>).toHaveProperty(name);
      expect((data as Record<string, unknown>)[name]).toBeDefined();
    }
  });
});
