"use client";

import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import type { TypeCode } from "@/data/types";
import { useSceneStore } from "@/lib/sceneStore";
import {
  CAMERA_FOV,
  CAMERA_Z,
  clamp,
  damp,
  easeInOutCubic,
  easeOutExpo,
  smoothstep,
} from "@/components/three/layout";
import { writeRuntime, type SceneRuntime } from "@/components/three/runtime";

/** Seconds the camera takes to reach a selected orb. */
export const FLIGHT_SECONDS = 0.9;
/** Radians per second of the constellation orbit (one lap ≈ 7 min). */
const ORBIT_SPEED = (Math.PI * 2) / 420;
/** Extra FOV at peak warp, for a sense of speed. */
const WARP_FOV = 26;

interface Flight {
  code: TypeCode;
  start: number;
  from: THREE.Vector3;
  look: THREE.Vector3;
  arrived: boolean;
}

export interface CameraRigProps {
  runtime: RefObject<SceneRuntime>;
  reduced: boolean;
  onArrive?: (code: TypeCode) => void;
}

/**
 * Drives the camera and the shared runtime each frame, before anything else
 * (`useFrame` priority -1; negative priorities don't take over rendering):
 * - pointer parallax with damped lerps, and a gentle dolly-back on scroll;
 * - when `sceneStore.flyingTo` is set, an eased ~0.9s flight into that orb
 *   (others dim, stars warp, FOV widens), then `onArrive(code)`.
 * The store is read with `getState()` so none of this re-renders React.
 * Under reduced motion it holds a static composition and never flies.
 */
export function CameraRig({ runtime, reduced, onArrive }: CameraRigProps) {
  const flight = useRef<Flight | null>(null);
  const look = useRef(new THREE.Vector3());
  const target = useMemo(() => new THREE.Vector3(), []);
  const end = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const rt = runtime.current;
    const cam = state.camera as THREE.PerspectiveCamera;
    const dt = Math.min(delta, 0.05);

    const time = reduced ? rt.time : rt.time + dt;
    const scroll = reduced
      ? rt.scroll
      : damp(rt.scroll, clamp(window.scrollY / (window.innerHeight || 1), 0, 2), 6, dt);
    const scrollDim = smoothstep(0.25, 1, scroll) * 0.75;

    const flyingTo = reduced ? null : useSceneStore.getState().flyingTo;
    let fov = CAMERA_FOV;

    if (flyingTo) {
      if (!flight.current || flight.current.code !== flyingTo) {
        flight.current = {
          code: flyingTo,
          start: state.clock.elapsedTime,
          from: cam.position.clone(),
          look: look.current.clone(),
          arrived: false,
        };
      }
      const f = flight.current;
      const t = clamp((state.clock.elapsedTime - f.start) / FLIGHT_SECONDS, 0, 1);
      const e = easeInOutCubic(t);
      const anchor = rt.orbs.get(f.code);

      if (anchor) {
        anchor.getWorldPosition(target);
        // Stop just in front of the orb surface, on the side we came from.
        end.copy(f.from).sub(target).normalize();
        const radius = anchor.scale.x || 0.3;
        end.multiplyScalar(radius * 2.4).add(target);
        cam.position.lerpVectors(f.from, end, e);
        look.current.lerpVectors(f.look, target, easeOutExpo(t));
      }

      const warp = smoothstep(0.06, 0.7, t);
      writeRuntime(rt, {
        time,
        scroll,
        scrollDim,
        focus: f.code,
        flight: e,
        warp,
        orbit: rt.orbit + dt * ORBIT_SPEED * (1 - e),
      });
      fov = CAMERA_FOV + WARP_FOV * warp;

      if (t >= 1 && !f.arrived) {
        f.arrived = true;
        onArrive?.(f.code);
      }
    } else {
      flight.current = null;
      writeRuntime(rt, {
        time,
        scroll,
        scrollDim,
        focus: null,
        flight: reduced ? 0 : damp(rt.flight, 0, 4, dt),
        warp: reduced ? 0 : damp(rt.warp, 0, 5, dt),
        orbit: reduced ? rt.orbit : rt.orbit + dt * ORBIT_SPEED,
      });

      const px = reduced ? 0 : state.pointer.x;
      const py = reduced ? 0 : state.pointer.y;
      const tx = px * 0.9;
      const ty = py * 0.55 - scroll * 0.9;
      const tz = CAMERA_Z + scroll * 2.2;
      const lx = px * 0.25;
      const ly = -scroll * 1.1;

      if (reduced) {
        cam.position.set(tx, ty, tz);
        look.current.set(lx, ly, 0);
      } else {
        cam.position.set(
          damp(cam.position.x, tx, 2.2, dt),
          damp(cam.position.y, ty, 2.2, dt),
          damp(cam.position.z, tz, 2.6, dt),
        );
        look.current.set(
          damp(look.current.x, lx, 2.4, dt),
          damp(look.current.y, ly, 2.4, dt),
          damp(look.current.z, 0, 2.4, dt),
        );
        fov = damp(cam.fov, CAMERA_FOV, 4, dt);
      }
    }

    cam.lookAt(look.current);
    if (Math.abs(cam.fov - fov) > 1e-3) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }
  }, -1);

  return null;
}
