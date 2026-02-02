import { describe, expect, it } from "vitest";

import { Point } from "./point";

describe("point", () => {
  it("should construct with default values", () => {
    const p = new Point();
    expect(p.x).toBe(0);
    expect(p.y).toBe(0);
  });

  it("should construct with given values", () => {
    const p = new Point(10, 20);
    expect(p.x).toBe(10);
    expect(p.y).toBe(20);
  });

  it("should calculate the delta between two points", () => {
    const p1 = new Point(10, 20);
    const p2 = new Point(15, 30);
    const delta = p1.delta(p2);
    expect(delta.x).toBe(5);
    expect(delta.y).toBe(10);
    expect(delta).toBeInstanceOf(Point);
  });
});
