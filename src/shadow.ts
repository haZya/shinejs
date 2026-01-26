import type { Color } from "./color";
import type { ShineConfig } from "./config";
import type { Light } from "./light";
import { Point } from "./point";

export class Shadow {
  position: Point = new Point(0, 0);
  domElement: HTMLElement;
  shadowProperty: "textShadow" | "boxShadow" = "textShadow";

  constructor(domElement: HTMLElement) {
    this.domElement = domElement;
    this.recalculatePosition();
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
    this.domElement.style[this.shadowProperty] = shadows.join(", ");
  }

  recalculatePosition(): void {
    if (!this.domElement)
      return;
    const boundingRect = this.domElement.getBoundingClientRect();
    this.position.x = boundingRect.left + boundingRect.width * 0.5;
    this.position.y = boundingRect.top + boundingRect.height * 0.5;
  }
}
