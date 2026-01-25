import type { Color } from "./color";
import type { ShineConfig } from "./config";
import type { Light } from "./light";
import { Point } from "./point";
import * as Timing from "./timing";

export class Shadow {
  position: Point = new Point(0, 0);
  domElement: HTMLElement;
  shadowProperty = "textShadow";

  private fnHandleViewportUpdate: () => void;
  private fnHandleWindowLoaded: () => void;

  constructor(domElement: HTMLElement) {
    this.domElement = domElement;
    this.fnHandleWindowLoaded = this.handleWindowLoaded.bind(this);

    // fnHandleViewportUpdate is bound in enableAutoUpdates
    this.fnHandleViewportUpdate = () => {}; // Placeholder

    this.enableAutoUpdates();
    this.handleViewportUpdate();

    window.addEventListener("load", this.fnHandleWindowLoaded, false);
  }

  destroy(): void {
    window.removeEventListener("load", this.fnHandleWindowLoaded, false);
    this.disableAutoUpdates();
    this.domElement = null!;
    this.position = null!;
  }

  draw(light: Light, config: ShineConfig): void {
    const delta = this.position.delta(light.position);
    let distance = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
    distance = Math.max(32, distance);

    const shadows = [];

    for (let i = 0; i < config.numSteps; i++) {
      const ratio = i / config.numSteps;
      const ratioOpacity = ratio ** config.opacityPow;
      const ratioOffset = ratio ** config.offsetPow;
      const ratioBlur = ratio ** config.blurPow;

      const opacity = light.intensity * Math.max(0, config.opacity * (1.0 - ratioOpacity));
      const offsetX = -config.offset * delta.x * ratioOffset;
      const offsetY = -config.offset * delta.y * ratioOffset;
      const blurRadius = distance * config.blur * ratioBlur / 512;

      const shadow = this.getShadow(config.shadowRGB, opacity, offsetX, offsetY, blurRadius);
      shadows.push(shadow);
    }

    this.drawShadows(shadows);
  }

  getShadow(colorRGB: Color, opacity: number, offsetX: number, offsetY: number, blurRadius: number): string {
    const color = `rgba(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}, ${opacity})`;
    return `${color} ${offsetX}px ${offsetY}px ${Math.round(blurRadius)}px`;
  }

  drawShadows(shadows: string[]): void {
    (this.domElement.style as any)[this.shadowProperty] = shadows.join(", ");
  }

  enableAutoUpdates(): void {
    this.disableAutoUpdates();
    this.fnHandleViewportUpdate = Timing.debounce(this.handleViewportUpdate, 1000 / 15, this);
    document.addEventListener("resize", this.fnHandleViewportUpdate, false);
    window.addEventListener("resize", this.fnHandleViewportUpdate, false);
    window.addEventListener("scroll", this.fnHandleViewportUpdate, false);
  }

  disableAutoUpdates(): void {
    if (!this.fnHandleViewportUpdate) {
      return;
    }
    document.removeEventListener("resize", this.fnHandleViewportUpdate, false);
    window.removeEventListener("resize", this.fnHandleViewportUpdate, false);
    window.removeEventListener("scroll", this.fnHandleViewportUpdate, false);
    this.fnHandleViewportUpdate = () => {}; // Clear out the debounced function
  }

  private handleViewportUpdate(): void {
    if (!this.domElement)
      return;
    const boundingRect = this.domElement.getBoundingClientRect();
    this.position.x = boundingRect.left + boundingRect.width * 0.5;
    this.position.y = boundingRect.top + boundingRect.height * 0.5;
  }

  private handleWindowLoaded(): void {
    this.handleViewportUpdate();
  }
}
