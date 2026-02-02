import { beforeEach, describe, expect, it, vi } from "vitest";

import { ShineConfig } from "./config";
import { Light } from "./light";
import { Point } from "./point";
import { Shadow } from "./shadow";

describe("shadow", () => {
  let element: HTMLElement;
  let shadow: Shadow;

  beforeEach(() => {
    element = document.createElement("div");
    document.body.appendChild(element);
    // Mock getBoundingClientRect
    element.getBoundingClientRect = vi.fn(() => ({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      right: 200,
      bottom: 200,
      x: 100,
      y: 100,
      toJSON: () => {},
    }));
    shadow = new Shadow(element);
  });

  it("should initialize with correct position", () => {
    // Center of 100,100 w100 h100 is 150,150
    expect(shadow.position.x).toBe(150);
    expect(shadow.position.y).toBe(150);
  });

  it("should recalculate position", () => {
    element.getBoundingClientRect = vi.fn(() => ({
      left: 0,
      top: 0,
      width: 50,
      height: 50,
      right: 50,
      bottom: 50,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));
    shadow.recalculatePosition();
    expect(shadow.position.x).toBe(25);
    expect(shadow.position.y).toBe(25);
  });

  it("should draw shadows", () => {
    const light = new Light(new Point(0, 0)); // Top-left
    const config = new ShineConfig({ numSteps: 2, opacity: 1, blur: 0 });

    shadow.draw(light, config);

    // Check if style was applied
    expect(element.style.textShadow).not.toBe("");
    // simple check for content
    expect(element.style.textShadow).toContain("rgba");
  });
});
