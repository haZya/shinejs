import { describe, expect, it } from "vitest";

import { Color } from "./color";
import { ShineConfig } from "./config";

describe("shineConfig", () => {
  it("should construct with default values", () => {
    const config = new ShineConfig();
    expect(config.numSteps).toBe(5);
    expect(config.opacity).toBe(0.15);
    expect(config.shadowRGB.r).toBe(0);
    expect(config.shadowRGB.g).toBe(0);
    expect(config.shadowRGB.b).toBe(0);
  });

  it("should apply values from a settings object on construction", () => {
    const settings = {
      numSteps: 10,
      opacity: 0.5,
      shadowRGB: new Color(255, 0, 0),
    };
    const config = new ShineConfig(settings);
    expect(config.numSteps).toBe(10);
    expect(config.opacity).toBe(0.5);
    expect(config.shadowRGB.r).toBe(255);
  });

  it("should apply values with the applyValues method", () => {
    const config = new ShineConfig();
    const settings = {
      offset: 0.5,
      blur: 100,
    };
    config.applyValues(settings);
    expect(config.offset).toBe(0.5);
    expect(config.blur).toBe(100);
  });

  it("should ignore invalid keys in the settings object", () => {
    const config = new ShineConfig();
    const settings = {
      invalidKey: "someValue",
      numSteps: 20,
    };
    config.applyValues(settings);
    expect((config as any).invalidKey).toBeUndefined();
    expect(config.numSteps).toBe(20);
  });
});
