"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { Bloom, EffectComposer, ToneMapping, Vignette } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

import type { TypeCode } from "@/data/types";
import { useSceneStore } from "@/lib/sceneStore";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/useMediaQuery";
import { CameraRig } from "@/components/three/CameraRig";
import { Constellations } from "@/components/three/Constellations";
import { Starfield } from "@/components/three/Starfield";
import { CAMERA_FOV, CAMERA_Z } from "@/components/three/layout";
import { createRuntime, type SceneRuntime } from "@/components/three/runtime";

export interface CosmicSceneProps {
  /** Text direction: mirrors the constellation quadrants under RTL. */
  dir?: "ltr" | "rtl";
  /** Fired once, after the first frame is on screen (for the fade-in). */
  onReady?: () => void;
  /** Fired when a `flyingTo` flight reaches its orb. */
  onArrive?: (code: TypeCode) => void;
}

const STARS_FULL = 4000;
const STARS_LITE = 1500;

/** Calls `onReady` once after the first rendered frame. */
function FirstFrame({ onReady }: { onReady?: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    requestAnimationFrame(() => onReady?.());
  });
  return null;
}

/** Under `frameloop="demand"`, re-render the static frame when DOM hover changes. */
function InvalidateOnStore() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => useSceneStore.subscribe(() => invalidate()), [invalidate]);
  return null;
}

function readBackground(): string {
  // The page token (`--color-bg` via body) so the canvas matches the CSS exactly.
  return getComputedStyle(document.body).backgroundColor || "black";
}

/**
 * The landing cosmos: starfield, 16 type orbs in 4 constellations, camera
 * rig (parallax + selection flight), Bloom + tone mapping + vignette.
 * Client-only — load it through `CosmicBackdrop` (next/dynamic, ssr:false).
 *
 * Performance: DPR clamped to [1, 1.5]; `PerformanceMonitor` raises it to 2
 * on incline and drops it (and Bloom) on decline; `AdaptiveDpr` follows any
 * `performance.regress()` calls (none per frame: resizing the composer's
 * targets mid-flight would hitch); small screens and low-performance
 * fallbacks render 1500 stars instead of 4000. Reduced motion renders on
 * demand only (static composition, no flight).
 */
export default function CosmicScene({ dir = "ltr", onReady, onArrive }: CosmicSceneProps) {
  const reduced = usePrefersReducedMotion();
  const small = useMediaQuery("(max-width: 640px)");
  const [dpr, setDpr] = useState<number | [number, number]>([1, 1.5]);
  const [bloom, setBloom] = useState(true);
  const [lite, setLite] = useState(false);
  const [background] = useState(readBackground);
  const runtime = useRef<SceneRuntime>(createRuntime());

  return (
    <Canvas
      dpr={dpr}
      flat
      frameloop={reduced ? "demand" : "always"}
      gl={{ antialias: false, alpha: false, stencil: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, CAMERA_Z], fov: CAMERA_FOV, near: 0.1, far: 220 }}
      performance={{ min: 0.6 }}
      // The canvas sits behind the page; listen on <body> so orbs still get
      // hover where the page is empty space (see `isOverContent`).
      eventSource={document.body}
      eventPrefix="client"
    >
      <color attach="background" args={[background]} />

      <PerformanceMonitor
        flipflops={3}
        onIncline={() => {
          setDpr(Math.min(2, window.devicePixelRatio || 1));
          setBloom(true);
        }}
        onDecline={() => {
          setDpr([1, 1.5]);
          setBloom(false);
        }}
        onFallback={() => {
          setDpr(1);
          setBloom(false);
          setLite(true);
        }}
      />
      <AdaptiveDpr />

      <CameraRig runtime={runtime} reduced={reduced} onArrive={onArrive} />
      <Starfield count={small || lite ? STARS_LITE : STARS_FULL} runtime={runtime} />
      <Constellations runtime={runtime} reduced={reduced} rtl={dir === "rtl"} />

      <EffectComposer multisampling={0} enableNormalPass={false}>
        {bloom ? (
          <Bloom mipmapBlur luminanceThreshold={0.15} luminanceSmoothing={0.3} intensity={1.1} />
        ) : (
          <></>
        )}
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        <Vignette eskil={false} offset={0.24} darkness={0.72} />
      </EffectComposer>

      {reduced && <InvalidateOnStore />}
      <FirstFrame onReady={onReady} />
    </Canvas>
  );
}
