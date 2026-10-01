import * as THREE from "three";

import {
  ATMOSPHERE_FRAGMENT,
  ATMOSPHERE_VERTEX,
  ORB_FRAGMENT,
  ORB_VERTEX,
} from "@/components/three/shaders/orb";

export interface OrbUniforms {
  [uniform: string]: THREE.IUniform;
  uColor: THREE.IUniform<THREE.Color>;
  uTime: THREE.IUniform<number>;
  uSeed: THREE.IUniform<number>;
  uHover: THREE.IUniform<number>;
  uDim: THREE.IUniform<number>;
  uIntensity: THREE.IUniform<number>;
}

export type OrbMaterial = THREE.ShaderMaterial & { uniforms: OrbUniforms };

export interface OrbMaterialOptions {
  /** Any CSS colour three.js can parse (hex, rgb()). Converted to linear. */
  color: string;
  /** Noise offset so orbs don't swirl in sync. Default `0`. */
  seed?: number;
  /** Emissive gain; >1 pushes the surface into Bloom range. Default `1.25`. */
  intensity?: number;
}

/**
 * The swirling, fresnel-rimmed orb surface (see `shaders/orb.ts`). Shared by
 * the landing cosmos and the type hub hero. Caller owns disposal.
 */
export function createOrbMaterial({ color, seed = 0, intensity = 1.25 }: OrbMaterialOptions) {
  return new THREE.ShaderMaterial({
    vertexShader: ORB_VERTEX,
    fragmentShader: ORB_FRAGMENT,
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uTime: { value: 0 },
      uSeed: { value: seed },
      uHover: { value: 0 },
      uDim: { value: 0 },
      uIntensity: { value: intensity },
    },
  }) as OrbMaterial;
}

/** Additive back-faced halo drawn around an orb (scale its mesh ~1.45x). */
export function createAtmosphereMaterial({ color, intensity = 1 }: OrbMaterialOptions) {
  return new THREE.ShaderMaterial({
    vertexShader: ATMOSPHERE_VERTEX,
    fragmentShader: ATMOSPHERE_FRAGMENT,
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uTime: { value: 0 },
      uSeed: { value: 0 },
      uHover: { value: 0 },
      uDim: { value: 0 },
      uIntensity: { value: intensity },
    },
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }) as OrbMaterial;
}

/** Writes the per-frame uniforms shared by both orb materials. */
export function updateOrbUniforms(
  material: THREE.Material | THREE.Material[],
  values: { time: number; hover: number; dim: number },
) {
  const m = material as OrbMaterial;
  if (!m.uniforms) return;
  m.uniforms.uTime.value = values.time;
  m.uniforms.uHover.value = values.hover;
  m.uniforms.uDim.value = values.dim;
}
