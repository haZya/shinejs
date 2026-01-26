import type { ShineConfigSettings } from "./config";
import { ShineConfig } from "./config";
import { Light } from "./light";
import { Shadow } from "./shadow";
import { Splitter } from "./splitter";
import { StyleInjector } from "./style-injector";
import { debounce } from "./timing";

export type ShadowProperty = "textShadow" | "boxShadow";

export class Shine {
  light = new Light();
  config: ShineConfig;
  domElement: HTMLElement;
  classPrefix = "shine-";
  shadowProperty: ShadowProperty;
  shadows: Shadow[] = [];
  splitter: Splitter;
  areAutoUpdatesEnabled = true;

  private rafId: number | null = null;
  private handleAutoUpdate: () => void;

  constructor(
    domElement: HTMLElement,
    optConfig?: ShineConfigSettings,
    optClassPrefix?: string,
    optShadowProperty?: ShadowProperty,
  ) {
    if (!domElement) {
      throw new Error("No valid DOM element passed as the first parameter");
    }

    this.domElement = domElement;
    this.config = new ShineConfig(optConfig);
    this.classPrefix = optClassPrefix || "shine-";
    this.shadowProperty = optShadowProperty || (this.elementHasTextOnly(domElement) ? "textShadow" : "boxShadow");
    this.splitter = new Splitter(domElement, this.classPrefix);

    this.handleAutoUpdate = debounce(() => {
      this.recalculatePositions();
      this.draw();
    }, 1000 / 15);

    this.updateContent();
  }

  destroy(): void {
    this.disableAutoUpdates();
    this.shadows = [];
    this.splitter = null!;
    this.handleAutoUpdate = null!;
    this.light = null!;
    this.config = null!;
    this.domElement = null!;
  }

  draw(): void {
    if (!this.light || !this.config || !this.shadows.length)
      return;

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    this.rafId = requestAnimationFrame(() => {
      this.shadows.forEach(shadow => shadow.draw(this.light, this.config));
      this.rafId = null;
    });
  }

  recalculatePositions(): void {
    this.shadows.forEach(shadow => shadow.recalculatePosition());
  }

  updateContent(optText?: string): void {
    const wereAutoUpdatesEnabled = this.areAutoUpdatesEnabled;
    this.disableAutoUpdates();

    StyleInjector.getInstance().inject(this.getCSS());

    this.shadows = [];

    this.splitter.split(optText, !optText && !this.elementHasTextOnly(this.domElement));

    this.splitter.elements.forEach((element) => {
      const shadow = new Shadow(element);
      shadow.shadowProperty = this.shadowProperty;
      this.shadows.push(shadow);
    });

    if (wereAutoUpdatesEnabled) {
      this.enableAutoUpdates();
    }
    // Force a position update since we just created new shadows
    this.recalculatePositions();
    this.draw();
  }

  enableAutoUpdates(): void {
    this.disableAutoUpdates();
    this.areAutoUpdatesEnabled = true;

    window.addEventListener("scroll", this.handleAutoUpdate, false);
    window.addEventListener("resize", this.handleAutoUpdate, false);
  }

  disableAutoUpdates(): void {
    this.areAutoUpdatesEnabled = false;

    if (this.handleAutoUpdate) {
      window.removeEventListener("scroll", this.handleAutoUpdate, false);
      window.removeEventListener("resize", this.handleAutoUpdate, false);
    }
  }

  private getCSS(): string {
    return `
      .shine-wrapper {
        display: inline-block;
        position: relative;
        max-width: 100%;
      }
      .shine-word {
        display: inline-block;
        white-space: nowrap;
      }
      .shine-letter {
        position: relative;
        display: inline-block;
      }
      .shine-mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    `;
  }

  private elementHasTextOnly(element: HTMLElement): boolean {
    if (!element.childNodes || element.childNodes.length === 0) {
      return true;
    }

    for (let i = 0; i < element.childNodes.length; i++) {
      if (element.childNodes[i].nodeType !== 3) { // Node.TEXT_NODE
        return false;
      }
    }
    return true;
  }
}
