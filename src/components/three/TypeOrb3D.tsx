"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";

import type { TypeCode } from "@/data/types";
import { useSceneStore } from "@/lib/sceneStore";
import {
  createAtmosphereMaterial,
  createOrbMaterial,
  updateOrbUniforms,
} from "@/components/three/orbMaterial";
import { damp, type Vec3 } from "@/components/three/layout";
import { isOverContent, type SceneRuntime } from "@/components/three/runtime";

// One sphere shared by every orb (and its halo) — scaled per mesh.
const SPHERE = new THREE.SphereGeometry(1, 64, 48);

const HALO_SCALE = 1.5;

export interface TypeOrb3DProps {
  code: TypeCode;
  /** Accent colour (hex from `TYPES[code].accent`). */
  color: string;
  position?: Vec3;
  /** Sphere radius in world units. Default `0.3`. */
  radius?: number;
  /** Noise seed so orbs don't swirl in sync. Default `0`. */
  seed?: number;
  /** Shared per-frame state (flight focus/dim, clock). Optional for standalone use. */
  runtime?: RefObject<SceneRuntime>;
  /** Static render: no float, no damping. */
  reduced?: boolean;
  /** Canvas hover (raycast) shows the label and grows the orb. Default `true`. */
  interactive?: boolean;
  /** Emissive gain. Default `1.25`. */
  intensity?: number;
}

/**
 * A glowing type orb: custom shader surface + additive halo, bobbing with
 * drei `<Float>`. Hover — from the canvas or from `sceneStore.hoveredType`
 * (a hovered DOM card) — scales it ×1.5 and brightens it, and shows its
 * code in a drei `<Html>` label.
 */
export function TypeOrb3D({
  code,
  color,
  position = [0, 0, 0],
  radius = 0.3,
  seed = 0,
  runtime,
  reduced = false,
  interactive = true,
  intensity = 1.25,
}: TypeOrb3DProps) {
  const anchor = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);
  const hover = useRef(0);
  const pointerOver = useRef(false);

  // Only this orb re-renders when its DOM hover flips (label on/off).
  const domHovered = useSceneStore((s) => s.hoveredType === code);
  const [canvasHovered, setCanvasHovered] = useState(false);

  const coreMaterial = useMemo(
    () => createOrbMaterial({ color, seed, intensity }),
    [color, seed, intensity],
  );
  const haloMaterial = useMemo(() => createAtmosphereMaterial({ color }), [color]);
  useEffect(
    () => () => {
      coreMaterial.dispose();
      haloMaterial.dispose();
    },
    [coreMaterial, haloMaterial],
  );

  // Register the floating anchor so the rig can fly to it and lines can follow it.
  useEffect(() => {
    const rt = runtime?.current;
    const obj = anchor.current;
    if (!rt || !obj) return;
    rt.orbs.set(code, obj);
    return () => {
      if (rt.orbs.get(code) === obj) rt.orbs.delete(code);
    };
  }, [code, runtime]);

  useFrame((state, delta) => {
    const obj = anchor.current;
    if (!obj || !core.current || !halo.current) return;
    const rt = runtime?.current;
    const dt = Math.min(delta, 0.05);

    const target = useSceneStore.getState().hoveredType === code || pointerOver.current ? 1 : 0;
    hover.current = reduced ? target : damp(hover.current, target, 9, dt);

    const focus = rt?.focus ?? null;
    const flight = rt?.flight ?? 0;
    const isFocus = focus === code;
    const dim = Math.max(focus && !isFocus ? flight : 0, rt?.scrollDim ?? 0);

    obj.scale.setScalar(radius * (1 + 0.5 * hover.current) * (isFocus ? 1 + flight * 0.35 : 1));

    const time = rt?.time ?? state.clock.elapsedTime;
    const values = { time, hover: Math.max(hover.current, isFocus ? flight : 0), dim };
    updateOrbUniforms(core.current.material, values);
    updateOrbUniforms(halo.current.material, values);
  });

  const handlers = interactive
    ? {
        onPointerOver: (e: ThreeEvent<PointerEvent>) => {
          if (isOverContent(e.nativeEvent)) return;
          e.stopPropagation();
          pointerOver.current = true;
          setCanvasHovered(true);
        },
        onPointerMove: (e: ThreeEvent<PointerEvent>) => {
          // The DOM can slide over the orb (scroll) while the ray still hits it.
          const blocked = isOverContent(e.nativeEvent);
          if (blocked === !pointerOver.current) return;
          pointerOver.current = !blocked;
          setCanvasHovered(!blocked);
        },
        onPointerOut: () => {
          pointerOver.current = false;
          setCanvasHovered(false);
        },
      }
    : {};

  const showLabel = domHovered || canvasHovered;

  return (
    <group position={position}>
      <Float
        enabled={!reduced}
        speed={0.9 + ((seed * 0.618) % 1) * 0.8}
        rotationIntensity={0.25}
        floatIntensity={0.55}
        floatingRange={[-0.18, 0.18]}
      >
        <group ref={anchor} scale={radius} {...handlers}>
          <mesh ref={core} geometry={SPHERE} material={coreMaterial} />
          <mesh ref={halo} geometry={SPHERE} material={haloMaterial} scale={HALO_SCALE} />
          {showLabel && (
            <Html center position={[0, 2.4, 0]} zIndexRange={[1, 0]} pointerEvents="none">
              <span
                translate="no"
                className="glass block animate-in rounded-full px-3 py-1 font-display text-xs font-semibold tracking-[0.2em] whitespace-nowrap text-fg fade-in zoom-in-90 duration-300"
              >
                {code}
              </span>
            </Html>
          )}
        </group>
      </Float>
    </group>
  );
}
