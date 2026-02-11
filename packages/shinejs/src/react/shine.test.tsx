import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Shine as ShineCore } from "../index";
import { Shine } from "./shine";

vi.mock("../index", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../index")>();
  return {
    ...actual,
    Shine: vi.fn(function (this: any) {
      this.update = vi.fn();
      this.destroy = vi.fn();
    }),
  };
});

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

describe("shine component", () => {
  let container: HTMLDivElement;
  let root: ReturnType<typeof createRoot> | null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    vi.clearAllMocks();
  });

  afterEach(async () => {
    await act(async () => {
      if (root) {
        root.unmount();
      }
    });
    container.remove();
  });

  it("renders a div by default and initializes Shine", async () => {
    await act(async () => {
      root!.render(<Shine>hello</Shine>);
    });

    const targetElement = container.querySelector("div");

    expect(targetElement).not.toBeNull();
    expect(ShineCore).toHaveBeenCalledTimes(1);
    expect(ShineCore).toHaveBeenCalledWith(targetElement, { content: "hello" });
  });

  it("supports rendering a custom HTML element", async () => {
    await act(async () => {
      root!.render(<Shine as="h2">Title</Shine>);
    });

    const headingElement = container.querySelector("h2");

    expect(headingElement).not.toBeNull();
    expect(ShineCore).toHaveBeenCalledWith(headingElement, { content: "Title" });
  });

  it("merges text children into config content", async () => {
    await act(async () => {
      root!.render(
        <Shine options={{ config: { numSteps: 12 }, light: { intensity: 0.5 } }}>
          Shine Text
        </Shine>,
      );
    });

    expect(ShineCore).toHaveBeenCalledWith(expect.any(HTMLElement), {
      config: { numSteps: 12 },
      content: "Shine Text",
      light: { intensity: 0.5 },
    });
  });

  it("creates a single Shine instance and sends diffed updates", async () => {
    await act(async () => {
      root!.render(
        <Shine options={{ config: { numSteps: 12 }, light: { intensity: 0.5 } }}>
          Shine Text
        </Shine>,
      );
    });

    const instance = (ShineCore as any).mock.results[0].value;

    await act(async () => {
      root!.render(
        <Shine options={{ config: { numSteps: 20 }, light: { intensity: 0.5 } }}>
          Shine Text
        </Shine>,
      );
    });

    expect(ShineCore).toHaveBeenCalledTimes(1);
    expect(instance.update).toHaveBeenCalledWith({ config: { numSteps: 20 } });
  });

  it("updates content when children text changes", async () => {
    await act(async () => {
      root!.render(<Shine>First</Shine>);
    });

    const instance = (ShineCore as any).mock.results[0].value;

    await act(async () => {
      root!.render(<Shine>Second</Shine>);
    });

    expect(ShineCore).toHaveBeenCalledTimes(1);
    expect(instance.update).toHaveBeenCalledWith({ content: "Second" });
  });

  it("destroys the instance on unmount", async () => {
    await act(async () => {
      root!.render(<Shine>Unmount me</Shine>);
    });

    const instance = (ShineCore as any).mock.results[0].value;

    await act(async () => {
      root?.unmount();
      root = null;
    });

    expect(instance.destroy).toHaveBeenCalledTimes(1);
  });

  it("forwards refs to the rendered element", async () => {
    let refElement: HTMLElement | null = null;

    await act(async () => {
      root!.render(
        <Shine as="p" ref={(node) => { refElement = node; }}>
          Paragraph
        </Shine>,
      );
    });

    expect(refElement).toBeInstanceOf(HTMLParagraphElement);
  });
});
