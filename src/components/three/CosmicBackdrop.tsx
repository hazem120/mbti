"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import type { TypeCode } from "@/data/types";
import { cn } from "@/lib/utils";
import { useDir } from "@/lib/useDir";
import { useSceneStore } from "@/lib/sceneStore";

// `ssr: false` must live in a client component in Next 16.
const CosmicScene = dynamic(() => import("@/components/three/CosmicScene"), {
  ssr: false,
  loading: () => null,
});

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function saveDataEnabled(): boolean {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  return nav.connection?.saveData === true;
}

const onArrive = (code: TypeCode) => useSceneStore.getState().setArrived(code);

/**
 * Fixed, decorative backdrop for the landing page. Paints a CSS nebula
 * immediately (also the permanent fallback without WebGL / with Save-Data),
 * then — once the browser is idle, off the critical path — lazy-loads the
 * WebGL `CosmicScene` and cross-fades it in after its first frame.
 */
export function CosmicBackdrop() {
  const dir = useDir();
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => {
      if (!saveDataEnabled() && supportsWebGL()) setLoad(true);
    };
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 1800 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 300);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="cosmic-fallback absolute inset-0" />
      {load && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-[1800ms] ease-out",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          <CosmicScene dir={dir} onReady={() => setReady(true)} onArrive={onArrive} />
        </div>
      )}
    </div>
  );
}
