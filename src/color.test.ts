import { describe, expect, it } from "vitest";
import { Color } from "./color";

describe("color", () => {
  it("should construct with default values", () => {
    const c = new Color();
    expect(c.r).toBe(0);
    expect(c.g).toBe(0);
    expect(c.b).toBe(0);
  });

  it("should construct with given values", () => {
    const c = new Color(255, 128, 0);
    expect(c.r).toBe(255);
    expect(c.g).toBe(128);
    expect(c.b).toBe(0);
  });
});
