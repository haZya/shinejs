import { beforeEach, describe, expect, it, vi } from "vitest";
import { Shine } from "./shine";
import { StyleInjector } from "./style-injector";

describe("shine", () => {
  let element: HTMLElement;

  beforeEach(() => {
    // Create a DOM element in the JSDOM environment
    document.body.innerHTML = "<h1 id=\"shine-target\">Hello World</h1>";
    element = document.getElementById("shine-target") as HTMLElement;
  });

  it("should throw an error if no DOM element is provided", () => {
    expect(() => new Shine(null!)).toThrow("No valid DOM element passed as the first parameter");
  });

  it("should create a Shine instance without errors", () => {
    const shine = new Shine(element);
    expect(shine).toBeInstanceOf(Shine);
    shine.destroy();
  });

  it("should create splitter and shadows on instantiation", () => {
    const shine = new Shine(element);
    expect(shine.splitter).not.toBeNull();
    // "Hello World" has 10 letters, no spaces are counted as elements
    expect(shine.shadows.length).toBe(10);
    shine.destroy();
  });

  it("should inject CSS styles on instantiation", () => {
    const spy = vi.spyOn(StyleInjector.getInstance(), "inject");
    const shine = new Shine(element);
    expect(spy).toHaveBeenCalled();
    shine.destroy();
    spy.mockRestore();
  });

  it("should determine shadowProperty as \"textShadow\" for text-only elements", () => {
    const shine = new Shine(element);
    expect(shine.shadowProperty).toBe("textShadow");
    shine.destroy();
  });

  it("should determine shadowProperty as \"boxShadow\" for elements with children", () => {
    element.innerHTML = "<span>Hello</span>";
    const shine = new Shine(element);
    expect(shine.shadowProperty).toBe("boxShadow");
    shine.destroy();
  });

  it("should call draw on all child shadows", () => {
    const shine = new Shine(element);
    const spies = shine.shadows.map(s => vi.spyOn(s, "draw"));

    shine.draw();

    spies.forEach(spy => expect(spy).toHaveBeenCalled());
    shine.destroy();
  });

  it("should update content when updateContent is called", () => {
    const shine = new Shine(element);
    expect(shine.shadows.length).toBe(10); // "Hello World"

    shine.updateContent("New Text");
    expect(shine.splitter.text).toBe("New Text");
    // "New Text" has 7 letters, space is ignored
    expect(shine.shadows.length).toBe(7);

    shine.destroy();
  });

  it("should add and remove event listeners for auto updates", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const shine = new Shine(element);
    shine.enableAutoUpdates();
    expect(addSpy).toHaveBeenCalledWith("scroll", expect.any(Function), false);
    expect(addSpy).toHaveBeenCalledWith("resize", expect.any(Function), false);

    shine.disableAutoUpdates();
    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function), false);
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function), false);

    shine.destroy();
  });
});
