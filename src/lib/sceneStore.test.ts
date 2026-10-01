import { beforeEach, describe, expect, it } from "vitest";

import { useSceneStore } from "@/lib/sceneStore";

describe("useSceneStore", () => {
  beforeEach(() => {
    useSceneStore.getState().reset();
  });

  it("starts empty", () => {
    const state = useSceneStore.getState();
    expect(state.hoveredType).toBeNull();
    expect(state.flyingTo).toBeNull();
  });

  it("sets and clears the hovered type", () => {
    useSceneStore.getState().setHovered("INFJ");
    expect(useSceneStore.getState().hoveredType).toBe("INFJ");
    useSceneStore.getState().setHovered(null);
    expect(useSceneStore.getState().hoveredType).toBeNull();
  });

  it("sets the fly-to target independently of hover", () => {
    useSceneStore.getState().setHovered("ENTP");
    useSceneStore.getState().setFlyingTo("ISFJ");
    const state = useSceneStore.getState();
    expect(state.hoveredType).toBe("ENTP");
    expect(state.flyingTo).toBe("ISFJ");
  });

  it("records arrival and clears it when a new flight starts", () => {
    useSceneStore.getState().setFlyingTo("INFJ");
    expect(useSceneStore.getState().arrived).toBeNull();
    useSceneStore.getState().setArrived("INFJ");
    expect(useSceneStore.getState().arrived).toBe("INFJ");
    useSceneStore.getState().setFlyingTo("ESTP");
    expect(useSceneStore.getState().arrived).toBeNull();
  });

  it("reset clears hover, flight and arrival", () => {
    useSceneStore.getState().setHovered("INTJ");
    useSceneStore.getState().setFlyingTo("INTJ");
    useSceneStore.getState().setArrived("INTJ");
    useSceneStore.getState().reset();
    const state = useSceneStore.getState();
    expect(state.hoveredType).toBeNull();
    expect(state.flyingTo).toBeNull();
    expect(state.arrived).toBeNull();
  });
});
