import { beforeEach, describe, expect, it, vi } from "vitest";

import { SharedMouseMonitor } from "./shared-mouse-monitor";

describe("sharedMouseMonitor", () => {
  let monitor: SharedMouseMonitor;

  beforeEach(() => {
    monitor = new SharedMouseMonitor();
  });

  it("should subscribe and unsubscribe", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const cb = vi.fn();

    const unsubscribe = monitor.subscribe(cb);
    expect(addSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));

    unsubscribe();
    expect(removeSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
  });

  it("should notify subscribers on mouse move", () => {
    const cb = vi.fn();
    monitor.subscribe(cb);

    const event = new MouseEvent("mousemove", {
      clientX: 100,
      clientY: 200,
    });
    window.dispatchEvent(event);

    expect(cb).toHaveBeenCalledWith(100, 200);
  });
});
