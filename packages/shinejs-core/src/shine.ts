import type { ShineConfigSettings } from "./config";

import { ShineConfig } from "./config";
import { Light } from "./light";
import { Shadow } from "./shadow";
import { sharedMouseMonitor } from "./shared-mouse-monitor";
import { Splitter } from "./splitter";
import { StyleInjector } from "./style-injector";
import { debounce } from "./timing";

/**
 * Specifies which CSS property to use for the shadow.
 */
export type ShadowProperty = "textShadow" | "boxShadow";

/**
 * Options for initializing or updating a Shine instance.
 */
export type ShineOptions = {
  /** Configuration settings for the shine effect. */
  config?: ShineConfigSettings;
  /** Light source configuration. */
  light?: {
    /** Fixed position {x, y} or "followMouse" to track the cursor. */
    position?: { x: number; y: number } | "followMouse";
    /** Light intensity. */
    intensity?: number;
  };
  /** Prefix for CSS classes injected by the library. Defaults to "shine-". */
  classPrefix?: string;
  /** Explicitly set the shadow property ("textShadow" or "boxShadow"). Auto-detected if omitted. */
  shadowProperty?: ShadowProperty;
  /** Content text to display. If provided, replaces the element's content. */
  content?: string;
};

/**
 * The main class for creating and managing the shine effect on a DOM element.
 */
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

  /**
   * Creates a new Shine instance.
   * @param domElement The DOM element to apply the effect to.
   * @param options Optional configuration options.
   */
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

    this.update(options);
  }

  /**
   * Destroys the Shine instance, removing event listeners and cleaning up references.
   * Does NOT revert DOM changes made by the splitter (text wrapping).
   */
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

  /**
   * Updates the Shine instance with new options.
   * @param options The new options to apply.
   */
  update(options?: ShineOptions): void {
    let needsRedraw = false;

    if (options?.content !== undefined) {
      this.updateContent(options.content);
      // updateContent calls draw() internally
    }
    else if (!this.shadows.length) {
      // Initialize content if not already done
      this.updateContent();
    }

    if (options?.light) {
      if (options.light.position === "followMouse") {
        this.enableMouseTracking();
      }
      else if (options.light.position) {
        this.disableMouseTracking();
        this.light.position.x = options.light.position.x;
        this.light.position.y = options.light.position.y;
        needsRedraw = true;
      }

      if (typeof options.light.intensity === "number") {
        this.light.intensity = options.light.intensity;
        needsRedraw = true;
      }
    }

    if (options?.config) {
      this.config.applyValues(options.config);
      needsRedraw = true;
    }

    if (needsRedraw) {
      this.draw();
    }
  }

  /**
   * Triggers a redraw of the shadows.
   * Uses requestAnimationFrame for performance.
   */
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

  /**
   * Recalculates the positions of all shadow elements.
   * Useful when the layout changes.
   */
  recalculatePositions(): void {
    this.shadows.forEach(shadow => shadow.recalculatePosition());
  }

  /**
   * Updates the text content of the element and re-initializes the effect.
   * @param optText Optional new text content.
   */
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

  /**
   * Enables automatic updates on scroll and resize events.
   */
  enableAutoUpdates(): void {
    this.disableAutoUpdates();
    this.areAutoUpdatesEnabled = true;

    window.addEventListener("scroll", this.handleAutoUpdate, false);
    window.addEventListener("resize", this.handleAutoUpdate, false);
  }

  /**
   * Disables automatic updates on scroll and resize events.
   */
  disableAutoUpdates(): void {
    this.areAutoUpdatesEnabled = false;

    if (this.handleAutoUpdate) {
      window.removeEventListener("scroll", this.handleAutoUpdate, false);
      window.removeEventListener("resize", this.handleAutoUpdate, false);
    }
  }

  /**
   * Enables mouse tracking for the light source.
   */
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

  /**
   * Disables mouse tracking.
   */
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
        transform: translate3d(0, 0, 0);
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
