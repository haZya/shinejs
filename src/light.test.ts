import { describe, expect, it } from "vitest";
import { Light } from "./light";
import { Point } from "./point";

describe("light", () => {
  it("should construct with a default position", () => {
    const light = new Light();
    expect(light.position.x).toBe(0);
    expect(light.position.y).toBe(0);
    expect(light.intensity).toBe(1.0);
  });

  it("should construct with a given position", () => {
    const p = new Point(100, 200);
    const light = new Light(p);
    expect(light.position).toBe(p);
    expect(light.position.x).toBe(100);
    expect(light.position.y).toBe(200);
  });
});
