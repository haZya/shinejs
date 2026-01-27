import type { ShineConfigSettings } from "./config";
import { ShineConfig } from "./config";
import { Light } from "./light";
import { Point } from "./point";
import { Shadow } from "./shadow";
import { sharedMouseMonitor } from "./shared-mouse-monitor";
import { Splitter } from "./splitter";
import { StyleInjector } from "./style-injector";
import { debounce } from "./timing";

export type ShadowProperty = "textShadow" | "boxShadow";

export type ShineOptions = {
  config?: ShineConfigSettings;
  light?: {
    position?: Point | "followMouse";
    intensity?: number;
  };
  classPrefix?: string;
  shadowProperty?: ShadowProperty;
  content?: string;
};

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
  private unsubscribeMouseMonitor: (() => void) | null = null;

  constructor(domElement: HTMLElement, options?: ShineOptions) {
    if (!domElement) {
      throw new Error("No valid DOM element passed as the first parameter");
    }

    this.domElement = domElement;
    this.config = new ShineConfig(options?.config);
    this.classPrefix = options?.classPrefix || "shine-";
    this.shadowProperty = options?.shadowProperty || (this.elementHasTextOnly(domElement) ? "textShadow" : "boxShadow");
    this.splitter = new Splitter(domElement, this.classPrefix);

    this.handleAutoUpdate = debounce(() => {
      this.recalculatePositions();
      this.draw();
    }, 1000 / 15);

    if (options?.light) {
      if (options.light.intensity !== undefined) {
        this.light.intensity = options.light.intensity;
      }

      if (options.light.position === "followMouse") {
        this.enableMouseTracking();
      }
      else if (options.light.position instanceof Point) {
        this.light.position.x = options.light.position.x;
        this.light.position.y = options.light.position.y;
      }
    }

    this.updateContent(options?.content);
  }

  destroy(): void {
    this.disableAutoUpdates();
    this.disableMouseTracking();
    this.shadows = [];

    if (this.splitter) {
      this.splitter.destroy();
      this.splitter = null!;
    }

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

  enableMouseTracking(): void {
    if (this.unsubscribeMouseMonitor) {
      return;
    }

    this.unsubscribeMouseMonitor = sharedMouseMonitor.subscribe((x, y) => {
      if (this.light) {
        this.light.position.x = x;
        this.light.position.y = y;
        this.draw();
      }
    });
  }

  disableMouseTracking(): void {
    if (this.unsubscribeMouseMonitor) {
      this.unsubscribeMouseMonitor();
      this.unsubscribeMouseMonitor = null;
    }
  }

  private getCSS(): string {
    return `
      .${this.classPrefix}wrapper {
        display: inherit;
        flex-direction: inherit;
        flex-wrap: inherit;
        align-items: inherit;
        justify-content: inherit;
        align-content: inherit;
        gap: inherit;
        column-gap: inherit;
        row-gap: inherit;
        grid-template-columns: inherit;
        grid-template-rows: inherit;
        grid-template-areas: inherit;
        grid-auto-columns: inherit;
        grid-auto-rows: inherit;
        grid-auto-flow: inherit;
        justify-items: inherit;
        place-items: inherit;
        place-content: inherit;
        position: relative;
        width: 100%;
        height: 100%;
        grid-column: 1 / -1;
        grid-row: 1 / -1;
      }
      .${this.classPrefix}word {
        display: inline-block;
        white-space: nowrap;
      }
      .${this.classPrefix}letter {
        position: relative;
        display: inline-block;
      }
      .${this.classPrefix}mask {
        display: inherit;
        flex-direction: inherit;
        flex-wrap: inherit;
        align-items: inherit;
        justify-content: inherit;
        align-content: inherit;
        gap: inherit;
        column-gap: inherit;
        row-gap: inherit;
        grid-template-columns: inherit;
        grid-template-rows: inherit;
        grid-template-areas: inherit;
        grid-auto-columns: inherit;
        grid-auto-rows: inherit;
        grid-auto-flow: inherit;
        justify-items: inherit;
        place-items: inherit;
        place-content: inherit;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
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
