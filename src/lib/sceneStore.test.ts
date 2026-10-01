import { beforeEach, describe, expect, it } from "vitest";

import { useSceneStore } from "@/lib/sceneStore";

describe("useSceneStore", () => {
  beforeEach(() => {
    useSceneStore.setState({ hoveredType: null, flyingTo: null });
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
});
