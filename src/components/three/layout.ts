/**
 * Pure layout + easing math for the landing cosmos (no three.js imports, so
 * it is unit-testable in the node test environment).
 */

import type { Temperament } from "@/data/types";

export type Vec3 = [number, number, number];

/** Camera field of view (degrees) and resting distance used by the scene. */
export const CAMERA_FOV = 45;
export const CAMERA_Z = 14;

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Frame-rate independent exponential damping toward `target`. */
export function damp(current: number, target: number, lambda: number, dt: number): number {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

export function easeInOutCubic(t: number): number {
  const x = clamp(t, 0, 1);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function easeOutExpo(t: number): number {
  const x = clamp(t, 0, 1);
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

export interface CosmosLayout {
  /** Half-axes of the ellipse the four constellation centres orbit on. */
  ellipse: [number, number];
  /** Resting angle (radians) of each constellation on that ellipse. */
  angles: Record<Temperament, number>;
  /** Distance from a constellation centre to each of its four orbs. */
  diamond: number;
  /** Orb sphere radius. */
  orbRadius: number;
}

/**
 * Places the four temperament constellations in the four quadrants of the
 * view, sized to the viewport aspect so they frame the hero copy on wide
 * screens and stack above/below it on portrait phones. Under RTL the
 * reading-order quadrants mirror (NT starts at the top-right).
 */
export function cosmosLayout(aspect: number, rtl: boolean): CosmosLayout {
  const halfH = CAMERA_Z * Math.tan(((CAMERA_FOV / 2) * Math.PI) / 180);
  const halfW = halfH * aspect;
  const portrait = aspect < 1;

  const rx = clamp(halfW * 0.6, 1.25, 6.6);
  const ry = portrait ? halfH * 0.6 : clamp(halfH * 0.48, 2.4, 3.2);

  // Angle of the quadrant corner on an ellipse with half-axes √2·(rx, ry):
  // at ±45° / ±135° the point lands exactly on (±rx, ±ry).
  const start = rtl ? 0.25 * Math.PI : 0.75 * Math.PI; // top, inline-start
  const end = rtl ? 0.75 * Math.PI : 0.25 * Math.PI; // top, inline-end
  const angles: Record<Temperament, number> = {
    NT: start,
    NF: end,
    SJ: -start,
    SP: -end,
  };

  return {
    ellipse: [rx * Math.SQRT2, ry * Math.SQRT2],
    angles,
    diamond: clamp(halfW * 0.13, 0.62, 1.3),
    orbRadius: clamp(halfW * 0.034, 0.2, 0.34),
  };
}

/** Position on the layout ellipse for an angle (z = 0). */
export function ellipsePoint(layout: CosmosLayout, angle: number): Vec3 {
  return [Math.cos(angle) * layout.ellipse[0], Math.sin(angle) * layout.ellipse[1], 0];
}

/**
 * Offsets of the four orbs of one constellation, forming a diamond:
 * top, inline-end, bottom, inline-start. A little depth makes the lines
 * between them read as 3D when the camera parallaxes.
 */
export function diamondOffsets(radius: number, rtl: boolean): [Vec3, Vec3, Vec3, Vec3] {
  const side = rtl ? -1 : 1;
  return [
    [0, radius, 0.35],
    [side * radius * 0.92, 0, -0.3],
    [0, -radius, 0.2],
    [-side * radius * 0.92, 0, -0.15],
  ];
}

/** Diamond edges as index pairs into `diamondOffsets` (closed loop). */
export const DIAMOND_EDGES: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
];

/** Small deterministic PRNG (mulberry32) so star generation is pure. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface StarAttributes {
  positions: Float32Array;
  sizes: Float32Array;
  phases: Float32Array;
  tints: Float32Array;
}

/**
 * Star attributes for `count` stars in a spherical shell around the origin.
 * Most stars are far (r 28–90); ~18% are near (r 9–28) for parallax depth.
 * Sizes are biased small so a few bright stars stand out.
 */
export function generateStars(count: number, seed = 7): StarAttributes {
  const rand = mulberry32(seed);
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const tints = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const near = rand() < 0.18;
    const r = near ? 9 + rand() * 19 : 28 + rand() * 62;
    // Uniform direction on the sphere.
    const u = rand() * 2 - 1;
    const theta = rand() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    positions[i * 3] = r * s * Math.cos(theta);
    positions[i * 3 + 1] = r * u;
    positions[i * 3 + 2] = r * s * Math.sin(theta);

    sizes[i] = 0.5 + Math.pow(rand(), 3) * 2.6;
    phases[i] = rand();
    tints[i] = rand();
  }

  return { positions, sizes, phases, tints };
}
