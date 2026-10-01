"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import { TEMPERAMENT_COLORS } from "@/data/types";
import { generateStars } from "@/components/three/layout";
import type { SceneRuntime } from "@/components/three/runtime";
import { STARS_FRAGMENT, STARS_VERTEX } from "@/components/three/shaders/stars";

export interface StarfieldProps {
  count: number;
  runtime: RefObject<SceneRuntime>;
}

/**
 * One `THREE.Points` draw call for the whole starfield (custom shader: size
 * attenuation, twinkle, blue→violet tint, warp streaks). Drifts slowly.
 */
export function Starfield({ count, runtime }: StarfieldProps) {
  const points = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const { positions, sizes, phases, tints } = generateStars(count);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    g.setAttribute("aTint", new THREE.BufferAttribute(tints, 1));
    return g;
  }, [count]);

  const material = useMemo(() => {
    const white = new THREE.Color(1, 1, 1);
    return new THREE.ShaderMaterial({
      vertexShader: STARS_VERTEX,
      fragmentShader: STARS_FRAGMENT,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: 1 },
        uScale: { value: 62 },
        uWarp: { value: 0 },
        uOpacity: { value: 1 },
        // Pale azure → pale violet (temperament tokens, lifted toward white).
        uColorA: { value: new THREE.Color(TEMPERAMENT_COLORS.SJ).lerp(white, 0.55) },
        uColorB: { value: new THREE.Color(TEMPERAMENT_COLORS.NT).lerp(white, 0.5) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => material.dispose(), [material]);

  useFrame((state, delta) => {
    const p = points.current;
    if (!p) return;
    const rt = runtime.current;
    const dt = Math.min(delta, 0.05);
    const m = p.material as THREE.ShaderMaterial;

    // Slow drift; it accelerates a touch while warping.
    p.rotation.y += dt * (0.006 + rt.warp * 0.02);
    p.rotation.x = Math.sin(rt.time * 0.02) * 0.06;

    m.uniforms.uTime.value = rt.time;
    m.uniforms.uWarp.value = rt.warp;
    m.uniforms.uPixelRatio.value = state.viewport.dpr;
    m.uniforms.uOpacity.value = 1 - rt.scrollDim * 0.35;
  });

  return (
    <points ref={points} geometry={geometry} material={material} frustumCulled={false} />
  );
}
