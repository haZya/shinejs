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

  it("should create a color from a hex string", () => {
    const c = Color.colorFromHex("#ff8000");
    expect(c.r).toBe(255);
    expect(c.g).toBe(128);
    expect(c.b).toBe(0);
  });

  it("should parse a hex string", () => {
    const c = new Color();
    c.parseHex("00ff00");
    expect(c.r).toBe(0);
    expect(c.g).toBe(255);
    expect(c.b).toBe(0);
  });

  it("should return a correct RGBA string", () => {
    const c = new Color(10, 20, 30);
    expect(c.getRGBAString()).toBe("rgba(10,20,30, 1.0)");
  });
});
