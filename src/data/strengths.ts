/**
 * Beebe-style function development strengths.
 * See .superpowers/sdd/2026-09-30-mbti-explorer/task-2-brief.md.
 */

import type { FunctionCode } from "@/data/functions";
import { flipAttitude } from "@/data/functions";
import type { TypeCode } from "@/data/types";
import { TYPES } from "@/data/types";

const STACK_STRENGTHS = [100, 80, 55, 30] as const;
const SHADOW_STRENGTHS = [45, 35, 25, 15] as const;

export function functionStrengths(code: TypeCode): Record<FunctionCode, number> {
  const stack = TYPES[code].stack;
  const strengths = {} as Record<FunctionCode, number>;
  stack.forEach((fn, i) => {
    strengths[fn] = STACK_STRENGTHS[i];
    strengths[flipAttitude(fn)] = SHADOW_STRENGTHS[i];
  });
  return strengths;
}
