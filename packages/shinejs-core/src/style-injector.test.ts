import { describe, expect, it } from "vitest";

import { StyleInjector } from "./style-injector";

describe("styleInjector", () => {
  it("should be a singleton", () => {
    const instance1 = StyleInjector.getInstance();
    const instance2 = StyleInjector.getInstance();
    expect(instance1).toBe(instance2);
  });

  it("should inject css into head", () => {
    const injector = StyleInjector.getInstance();
    const css = ".test-class { color: red; }";

    injector.inject(css);

    const styleElements = document.head.getElementsByTagName("style");
    let found = false;
    for (let i = 0; i < styleElements.length; i++) {
      if (styleElements[i].innerHTML === css) {
        found = true;
        break;
      }
    }
    expect(found).toBe(true);
  });

  it("should not inject duplicate css", () => {
    const injector = StyleInjector.getInstance();
    const css = ".unique-class { color: blue; }";

    const el1 = injector.inject(css);
    const el2 = injector.inject(css);

    expect(el1).toBeDefined();
    expect(el2).toBeUndefined();
  });
});
