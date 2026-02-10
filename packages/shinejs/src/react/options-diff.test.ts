import { describe, expect, it } from "vitest";

import { createUpdatePayload } from "./options-diff";

describe("createUpdatePayload", () => {
  it("returns null when both options are undefined", () => {
    expect(createUpdatePayload(undefined, undefined)).toBeNull();
  });

  it("returns next options when there is no previous config", () => {
    const next = { content: "shine", light: { intensity: 0.75 } };

    expect(createUpdatePayload(undefined, next)).toEqual(next);
  });

  it("returns null when next options are removed", () => {
    const previous = { content: "shine" };

    expect(createUpdatePayload(previous, undefined)).toBeNull();
  });

  it("returns only changed fields", () => {
    const previous = {
      classPrefix: "shine-",
      config: { numSteps: 10, opacity: 0.2 },
      content: "hello",
      light: { intensity: 0.8, position: { x: 10, y: 20 } },
    };
    const next = {
      classPrefix: "shine-",
      config: { numSteps: 10, opacity: 0.4 },
      content: "hello",
      light: { intensity: 0.8, position: { x: 10, y: 20 } },
    };

    expect(createUpdatePayload(previous, next)).toEqual({
      config: { numSteps: 10, opacity: 0.4 },
    });
  });

  it("returns null when options are deeply equal", () => {
    const previous = {
      config: { numSteps: 6 },
      light: { intensity: 0.5, position: { x: 0, y: 0 } },
      shadowProperty: "textShadow" as const,
    };
    const next = {
      config: { numSteps: 6 },
      light: { intensity: 0.5, position: { x: 0, y: 0 } },
      shadowProperty: "textShadow" as const,
    };

    expect(createUpdatePayload(previous, next)).toBeNull();
  });
});
