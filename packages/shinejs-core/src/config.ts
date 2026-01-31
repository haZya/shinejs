import { Color } from "./color";

export type ShineConfigSettings = {
  numSteps?: number;
  opacity?: number;
  opacityPow?: number;
  offset?: number;
  offsetPow?: number;
  blur?: number;
  blurPow?: number;
  shadowRGB?: { r: number; g: number; b: number };
};

export class ShineConfig {
  numSteps = 5;
  opacity = 0.15;
  opacityPow = 1.2;
  offset = 0.15;
  offsetPow = 1.8;
  blur = 40;
  blurPow = 1.0;
  shadowRGB: Color = new Color();

  constructor(settings?: ShineConfigSettings) {
    if (settings) {
      this.applyValues(settings);
    }
  }

  applyValues(settings: ShineConfigSettings): void {
    if (!settings) {
      return;
    }

    if (settings.numSteps !== undefined) {
      this.numSteps = settings.numSteps;
    }
    if (settings.opacity !== undefined) {
      this.opacity = settings.opacity;
    }
    if (settings.opacityPow !== undefined) {
      this.opacityPow = settings.opacityPow;
    }
    if (settings.offset !== undefined) {
      this.offset = settings.offset;
    }
    if (settings.offsetPow !== undefined) {
      this.offsetPow = settings.offsetPow;
    }
    if (settings.blur !== undefined) {
      this.blur = settings.blur;
    }
    if (settings.blurPow !== undefined) {
      this.blurPow = settings.blurPow;
    }
    if (settings.shadowRGB !== undefined) {
      this.shadowRGB = new Color(settings.shadowRGB.r, settings.shadowRGB.g, settings.shadowRGB.b);
    }
  }
}
