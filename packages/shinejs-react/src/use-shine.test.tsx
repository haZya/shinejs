import * as React from "react";
import { act, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Shine } from "shinejs-core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useShine } from "./use-shine";

// Mock shinejs-core
vi.mock("shinejs-core", async (importOriginal) => {
  const actual = await importOriginal<typeof import("shinejs-core")>();
  return {
    ...actual,
    Shine: vi.fn(function (this: any) {
      this.update = vi.fn();
      this.destroy = vi.fn();
    }),
  };
});

// Enable act environment
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

describe("useShine", () => {
  let container: HTMLDivElement;
  let root: any;
  let hookResult: any;

  function TestComponent({ config }: { config?: any }) {
    const ref = useRef<HTMLDivElement>(null);
    hookResult = useShine(ref, config);
    return <div ref={ref}>Test Content</div>;
  }

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    hookResult = null;
    vi.clearAllMocks();
  });

  afterEach(async () => {
    await act(async () => {
      if (root)
        root.unmount();
    });
    container.remove();
  });

  it("should initialize Shine when ref is attached", async () => {
    await act(async () => {
      root.render(<TestComponent />);
    });

    expect(Shine).toHaveBeenCalledTimes(1);
    expect(hookResult.shine).not.toBeNull();
  });

  it("should destroy Shine on unmount", async () => {
    await act(async () => {
      root.render(<TestComponent />);
    });

    const shineInstance = (Shine as any).mock.results[0].value;

    await act(async () => {
      root.unmount();
      root = null; // Prevent double unmount in afterEach
    });

    expect(shineInstance.destroy).toHaveBeenCalledTimes(1);
  });

  it("should update Shine when config changes", async () => {
    await act(async () => {
      root.render(<TestComponent config={{ numSteps: 5 }} />);
    });

    expect(Shine).toHaveBeenCalledWith(expect.any(HTMLElement), { numSteps: 5 });

    // Render with new config
    await act(async () => {
      root.render(<TestComponent config={{ numSteps: 10 }} />);
    });

    // Check if new instance created or updated?
    // Implementation of useShine:
    // useEffect depends on [configJson, ref].
    // If config changes, it destroys old and creates new instance.

    expect(Shine).toHaveBeenCalledTimes(2);
    expect(Shine).toHaveBeenLastCalledWith(expect.any(HTMLElement), { numSteps: 10 });

    // The previous instance should be destroyed
    const firstInstance = (Shine as any).mock.results[0].value;
    expect(firstInstance.destroy).toHaveBeenCalled();
  });

  it("should provide an update method that calls shine.update", async () => {
    await act(async () => {
      root.render(<TestComponent />);
    });

    const shineInstance = (Shine as any).mock.results[0].value;
    const newConfig = { opacity: 0.5 };

    act(() => {
      hookResult.update(newConfig);
    });

    expect(shineInstance.update).toHaveBeenCalledWith(newConfig);
  });
});
