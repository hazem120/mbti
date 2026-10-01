"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

import {
  TEMPERAMENTS,
  TEMPERAMENT_COLORS,
  TYPES,
  typesByTemperament,
  type Temperament,
} from "@/data/types";
import { TypeOrb3D } from "@/components/three/TypeOrb3D";
import {
  DIAMOND_EDGES,
  cosmosLayout,
  diamondOffsets,
  ellipsePoint,
  type CosmosLayout,
} from "@/components/three/layout";
import type { SceneRuntime } from "@/components/three/runtime";

interface CommonProps {
  runtime: RefObject<SceneRuntime>;
  reduced: boolean;
  rtl: boolean;
}

/** Soft radial sprite texture shared by the four nebula glows. */
function createGlowTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.35)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function Constellation({
  temperament,
  layout,
  runtime,
  reduced,
  rtl,
  glow,
}: CommonProps & { temperament: Temperament; layout: CosmosLayout; glow: THREE.Texture }) {
  const group = useRef<THREE.Group>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const nebula = useRef<THREE.Sprite>(null);
  const codes = useMemo(() => typesByTemperament(temperament), [temperament]);
  const offsets = useMemo(() => diamondOffsets(layout.diamond, rtl), [layout.diamond, rtl]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(DIAMOND_EDGES.length * 2 * 3);
    const colors = new Float32Array(DIAMOND_EDGES.length * 2 * 3);
    const color = new THREE.Color();
    DIAMOND_EDGES.forEach(([a, b], i) => {
      [a, b].forEach((orb, j) => {
        const v = (i * 2 + j) * 3;
        positions.set(offsets[orb], v);
        color.set(TYPES[codes[orb]].accent).toArray(colors, v);
      });
    });
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, [codes, offsets]);

  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.32,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  const nebulaMaterial = useMemo(
    () =>
      new THREE.SpriteMaterial({
        map: glow,
        color: new THREE.Color(TEMPERAMENT_COLORS[temperament]),
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [glow, temperament],
  );

  useEffect(
    () => () => {
      lineGeometry.dispose();
    },
    [lineGeometry],
  );
  useEffect(
    () => () => {
      lineMaterial.dispose();
      nebulaMaterial.dispose();
    },
    [lineMaterial, nebulaMaterial],
  );

  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const g = group.current;
    const rt = runtime.current;
    if (!g) return;

    // Slow orbit of the constellation around the hero + a gentle self-spin.
    const angle = layout.angles[temperament] + rt.orbit;
    const [x, y, z] = ellipsePoint(layout, angle);
    g.position.set(x, y, z);
    g.rotation.z = Math.sin(rt.time * 0.07 + layout.angles[temperament]) * 0.18;
    g.updateMatrixWorld();

    // Lines follow the bobbing orbs.
    const segs = lines.current;
    if (segs) {
      const attr = segs.geometry.getAttribute("position") as THREE.BufferAttribute;
      DIAMOND_EDGES.forEach(([a, b], i) => {
        [a, b].forEach((orb, j) => {
          const anchor = rt.orbs.get(codes[orb]);
          if (!anchor) return;
          anchor.getWorldPosition(tmp);
          g.worldToLocal(tmp);
          attr.setXYZ(i * 2 + j, tmp.x, tmp.y, tmp.z);
        });
      });
      attr.needsUpdate = true;
      (segs.material as THREE.LineBasicMaterial).opacity =
        0.32 * (1 - rt.flight * 0.92) * (1 - rt.scrollDim * 0.6);
    }

    const sprite = nebula.current;
    if (sprite) {
      (sprite.material as THREE.SpriteMaterial).opacity =
        0.16 * (1 - rt.flight * 0.8) * (1 - rt.scrollDim * 0.4);
    }
  });

  return (
    <group ref={group}>
      <sprite
        ref={nebula}
        material={nebulaMaterial}
        position={[0, 0, -1.2]}
        scale={layout.diamond * 5.2}
      />
      <lineSegments ref={lines} geometry={lineGeometry} material={lineMaterial} />
      {codes.map((code, i) => (
        <TypeOrb3D
          key={code}
          code={code}
          color={TYPES[code].accent}
          position={offsets[i]}
          radius={layout.orbRadius}
          seed={TEMPERAMENTS.indexOf(temperament) * 4 + i + 0.37}
          runtime={runtime}
          reduced={reduced}
        />
      ))}
    </group>
  );
}

/**
 * The 16 type orbs in four temperament constellations — one diamond per
 * quadrant, orbiting the hero slowly — joined by faint additive lines over
 * a soft nebula glow in the temperament colour.
 */
export function Constellations({ runtime, reduced, rtl }: CommonProps) {
  const aspect = useThree((s) => s.viewport.aspect);
  const layout = useMemo(() => cosmosLayout(aspect, rtl), [aspect, rtl]);
  const glow = useMemo(() => createGlowTexture(), []);
  useEffect(() => () => glow.dispose(), [glow]);

  return (
    <group>
      {TEMPERAMENTS.map((t) => (
        <Constellation
          key={t}
          temperament={t}
          layout={layout}
          runtime={runtime}
          reduced={reduced}
          rtl={rtl}
          glow={glow}
        />
      ))}
    </group>
  );
}
