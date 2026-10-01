import { describe, expect, it } from "vitest";

import {
  DIAMOND_EDGES,
  clamp,
  cosmosLayout,
  damp,
  diamondOffsets,
  easeInOutCubic,
  easeOutExpo,
  ellipsePoint,
  generateStars,
  mulberry32,
  smoothstep,
} from "@/components/three/layout";

describe("easing helpers", () => {
  it("clamps", () => {
    expect(clamp(-1, 0, 1)).toBe(0);
    expect(clamp(2, 0, 1)).toBe(1);
    expect(clamp(0.3, 0, 1)).toBe(0.3);
  });

  it("eases between 0 and 1 with fixed endpoints", () => {
    for (const ease of [easeInOutCubic, easeOutExpo]) {
      expect(ease(0)).toBeCloseTo(0, 5);
      expect(ease(1)).toBe(1);
      expect(ease(-3)).toBeCloseTo(0, 5);
      expect(ease(4)).toBe(1);
    }
    expect(easeInOutCubic(0.5)).toBeCloseTo(0.5, 5);
  });

  it("smoothstep is 0 below, 1 above, 0.5 in the middle", () => {
    expect(smoothstep(0.2, 0.8, 0)).toBe(0);
    expect(smoothstep(0.2, 0.8, 1)).toBe(1);
    expect(smoothstep(0.2, 0.8, 0.5)).toBeCloseTo(0.5, 5);
  });

  it("damp moves toward the target and is frame-rate independent", () => {
    const oneStep = damp(0, 1, 4, 1 / 30);
    const twoSteps = damp(damp(0, 1, 4, 1 / 60), 1, 4, 1 / 60);
    expect(oneStep).toBeGreaterThan(0);
    expect(oneStep).toBeLessThan(1);
    expect(twoSteps).toBeCloseTo(oneStep, 10);
  });
});

describe("cosmosLayout", () => {
  it("puts each temperament in its own quadrant (LTR reading order)", () => {
    const layout = cosmosLayout(16 / 9, false);
    const [ntX, ntY] = ellipsePoint(layout, layout.angles.NT);
    const [nfX, nfY] = ellipsePoint(layout, layout.angles.NF);
    const [sjX, sjY] = ellipsePoint(layout, layout.angles.SJ);
    const [spX, spY] = ellipsePoint(layout, layout.angles.SP);
    expect(ntX).toBeLessThan(0);
    expect(ntY).toBeGreaterThan(0);
    expect(nfX).toBeGreaterThan(0);
    expect(nfY).toBeGreaterThan(0);
    expect(sjX).toBeLessThan(0);
    expect(sjY).toBeLessThan(0);
    expect(spX).toBeGreaterThan(0);
    expect(spY).toBeLessThan(0);
  });

  it("mirrors the quadrants under RTL", () => {
    const ltr = cosmosLayout(1.6, false);
    const rtl = cosmosLayout(1.6, true);
    for (const t of ["NT", "NF", "SJ", "SP"] as const) {
      const [lx, ly] = ellipsePoint(ltr, ltr.angles[t]);
      const [rx, ry] = ellipsePoint(rtl, rtl.angles[t]);
      expect(rx).toBeCloseTo(-lx, 6);
      expect(ry).toBeCloseTo(ly, 6);
    }
  });

  it("tightens horizontally and spreads vertically on portrait screens", () => {
    const wide = cosmosLayout(16 / 9, false);
    const tall = cosmosLayout(9 / 19.5, false);
    expect(tall.ellipse[0]).toBeLessThan(wide.ellipse[0]);
    expect(tall.ellipse[1]).toBeGreaterThan(wide.ellipse[1]);
    expect(tall.orbRadius).toBeLessThanOrEqual(wide.orbRadius);
  });
});

describe("diamondOffsets", () => {
  it("forms a closed four-edge diamond that mirrors under RTL", () => {
    const ltr = diamondOffsets(1, false);
    const rtl = diamondOffsets(1, true);
    expect(DIAMOND_EDGES).toHaveLength(4);
    expect(ltr[0][1]).toBe(1);
    expect(ltr[2][1]).toBe(-1);
    expect(ltr[1][0]).toBeGreaterThan(0);
    expect(rtl[1][0]).toBeLessThan(0);
  });
});

describe("generateStars", () => {
  it("is deterministic for a seed and sized to the count", () => {
    const a = generateStars(500, 3);
    const b = generateStars(500, 3);
    expect(a.positions).toHaveLength(1500);
    expect(a.sizes).toHaveLength(500);
    expect(Array.from(a.positions.slice(0, 30))).toEqual(Array.from(b.positions.slice(0, 30)));
  });

  it("keeps stars in the 9–90 shell with sane attributes", () => {
    const { positions, sizes, phases, tints } = generateStars(2000);
    for (let i = 0; i < 2000; i++) {
      const r = Math.hypot(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      expect(r).toBeGreaterThanOrEqual(9 - 1e-3);
      expect(r).toBeLessThanOrEqual(90 + 1e-3);
      expect(sizes[i]).toBeGreaterThanOrEqual(0.5);
      expect(sizes[i]).toBeLessThanOrEqual(3.1);
      expect(phases[i]).toBeGreaterThanOrEqual(0);
      expect(phases[i]).toBeLessThan(1);
      expect(tints[i]).toBeGreaterThanOrEqual(0);
      expect(tints[i]).toBeLessThan(1);
    }
  });

  it("mulberry32 yields values in [0, 1)", () => {
    const rand = mulberry32(42);
    for (let i = 0; i < 1000; i++) {
      const v = rand();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});
