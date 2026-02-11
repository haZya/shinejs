import * as React from "react";
import { act, useRef } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Shine } from "../index";
import { useShine } from "./use-shine";

// Mock shinejs
vi.mock("../index", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../index")>();
  return {
    ...actual,
    Shine: vi.fn(function (this: any) {
      this.update = vi.fn();
      this.destroy = vi.fn();
      this.updateContent = vi.fn();
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
      root.render(<TestComponent config={{ config: { numSteps: 5 } }} />);
    });

    expect(Shine).toHaveBeenCalledWith(expect.any(HTMLElement), { config: { numSteps: 5 } });

    await act(async () => {
      root.render(<TestComponent config={{ config: { numSteps: 10 } }} />);
    });

    expect(Shine).toHaveBeenCalledTimes(1);
    const firstInstance = (Shine as any).mock.results[0].value;
    expect(firstInstance.update).toHaveBeenCalledWith({ config: { numSteps: 10 } });
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

  it("should keep a single instance and support imperative updates", async () => {
    await act(async () => {
      root.render(<TestComponent config={{ config: { numSteps: 5 } }} />);
    });

    const instance = (Shine as any).mock.results[0].value;
    const initialUpdate = hookResult.update;

    await act(async () => {
      root.render(<TestComponent config={{ config: { numSteps: 10 } }} />);
    });

    act(() => {
      initialUpdate({ config: { opacity: 0.2 } });
    });

    expect(Shine).toHaveBeenCalledTimes(1);
    expect(instance.update).toHaveBeenCalledWith({ config: { opacity: 0.2 } });
  });

  it("should not call updateContent after imperative content update on rerender", async () => {
    await act(async () => {
      root.render(<TestComponent config={{ light: { position: "followMouse" } }} />);
    });

    const instance = (Shine as any).mock.results[0].value;

    act(() => {
      hookResult.update({ content: "Hello World" });
    });

    await act(async () => {
      root.render(<TestComponent config={{ light: { position: "followMouse" } }} />);
    });

    expect(instance.update).toHaveBeenCalledWith({ content: "Hello World" });
    expect(instance.updateContent).not.toHaveBeenCalled();
  });
});
