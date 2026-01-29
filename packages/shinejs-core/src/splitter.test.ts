import { beforeEach, describe, expect, it } from "vitest";

import { Splitter } from "./splitter";

describe("splitter", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  it("should split text into words and letters with a11y attributes", () => {
    container.textContent = "Hello World";
    const splitter = new Splitter(container, "shine-");
    splitter.split();

    const wrapper = container.querySelector(".shine-wrapper");
    expect(wrapper).toBeTruthy();
    expect(wrapper?.getAttribute("aria-hidden")).toBe("true");
    expect(container.getAttribute("aria-label")).toBe("Hello World");

    // Check that we have the right number of elements including the mask
    const words = container.querySelectorAll(".shine-word");
    expect(words.length).toBe(4); // 2 in wrapper, 2 in mask

    const letters = container.querySelectorAll(".shine-letter");
    expect(letters.length).toBe(20); // 10 in wrapper, 10 in mask
  });

  it("should preserve children and not hide wrapper but hide mask", () => {
    container.innerHTML = "<span>1</span><span>2</span>";
    const splitter = new Splitter(container, "shine-");
    splitter.split(undefined, true);

    const wrapper = container.querySelector(".shine-wrapper");
    expect(wrapper?.getAttribute("aria-hidden")).toBeNull();

    const mask = container.querySelector(".shine-mask");
    expect(mask?.getAttribute("aria-hidden")).toBe("true");

    const letters = container.querySelectorAll(".shine-letter");
    expect(letters.length).toBe(4); // 2 in wrapper, 2 in mask
  });

  it("should have an aria-hidden mask element", () => {
    container.textContent = "A";
    const splitter = new Splitter(container, "shine-");
    splitter.split();

    const mask = container.querySelector(".shine-mask");
    expect(mask).toBeTruthy();
    expect(mask?.getAttribute("aria-hidden")).toBe("true");
  });

  it("should update aria-label when split is called with new text", () => {
    container.textContent = "Old";
    const splitter = new Splitter(container, "shine-");
    splitter.split();
    expect(container.getAttribute("aria-label")).toBe("Old");

    splitter.split("New");
    expect(container.getAttribute("aria-label")).toBe("New");
  });
});
