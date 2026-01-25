import type { ShineConfigSettings } from "./config";
import { ShineConfig } from "./config";
import { Light } from "./light";
import { Shadow } from "./shadow";
import { Splitter } from "./splitter";
import { StyleInjector } from "./style-injector";

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
  private fnDrawHandler: (() => void) | null = null;

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

    this.updateContent();
  }

  destroy(): void {
    this.disableAutoUpdates();
    this.shadows.forEach(shadow => shadow.destroy());
    this.shadows = [];
    this.splitter = null!;
    this.fnDrawHandler = null;
    this.light = null!;
    this.config = null!;
    this.domElement = null!;
  }

  draw(): void {
    if (!this.light || !this.config)
      return;
    this.shadows.forEach(shadow => shadow.draw(this.light, this.config));
  }

  updateContent(optText?: string): void {
    const wereAutoUpdatesEnabled = this.areAutoUpdatesEnabled;
    this.disableAutoUpdates();

    StyleInjector.getInstance().inject(this.getCSS());

    this.shadows.forEach(shadow => shadow.destroy());
    this.shadows = [];

    this.splitter.split(optText, !optText && !this.elementHasTextOnly(this.domElement));

    const shadowProperty = this.getPrefixed(this.shadowProperty);

    this.splitter.elements.forEach((element) => {
      const shadow = new Shadow(element);
      shadow.shadowProperty = shadowProperty;
      this.shadows.push(shadow);
    });

    if (wereAutoUpdatesEnabled) {
      this.enableAutoUpdates();
    }
    this.draw();
  }

  enableAutoUpdates(): void {
    this.disableAutoUpdates();
    this.areAutoUpdatesEnabled = true;

    this.fnDrawHandler = this.draw.bind(this);

    window.addEventListener("scroll", this.fnDrawHandler, false);
    window.addEventListener("resize", this.fnDrawHandler, false);

    this.shadows.forEach(shadow => shadow.enableAutoUpdates());
  }

  disableAutoUpdates(): void {
    this.areAutoUpdatesEnabled = false;

    if (this.fnDrawHandler) {
      window.removeEventListener("scroll", this.fnDrawHandler, false);
      window.removeEventListener("resize", this.fnDrawHandler, false);
      this.fnDrawHandler = null;
    }

    this.shadows.forEach(shadow => shadow.disableAutoUpdates());
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

  private getPrefixed(property: string): string {
    const style = this.domElement.style;
    const prefixes = ["webkit", "ms", "Moz", "O"];
    const suffix = property.charAt(0).toUpperCase() + property.substring(1);

    for (const prefix of prefixes) {
      const prefixed = `${prefix}${suffix}`;
      if (prefixed in style) {
        return prefixed;
      }
    }

    return property;
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
