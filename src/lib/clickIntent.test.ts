import { describe, expect, it } from "vitest";

import { isPlainPrimaryClick, type ClickLike } from "@/lib/clickIntent";

const plain: ClickLike = {
  button: 0,
  metaKey: false,
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
  defaultPrevented: false,
};

describe("isPlainPrimaryClick", () => {
  it("accepts a plain primary click (also what Enter on a link dispatches)", () => {
    expect(isPlainPrimaryClick(plain)).toBe(true);
  });

  it.each([
    ["cmd", { metaKey: true }],
    ["ctrl", { ctrlKey: true }],
    ["shift", { shiftKey: true }],
    ["alt", { altKey: true }],
    ["middle button", { button: 1 }],
    ["secondary button", { button: 2 }],
    ["already prevented", { defaultPrevented: true }],
  ])("rejects %s", (_label, patch) => {
    expect(isPlainPrimaryClick({ ...plain, ...patch })).toBe(false);
  });
});
