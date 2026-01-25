import { Color } from "./color";

export type ShineConfigSettings = {
  numSteps?: number;
  opacity?: number;
  opacityPow?: number;
  offset?: number;
  offsetPow?: number;
  blur?: number;
  blurPow?: number;
  shadowRGB?: Color;
};

export class ShineConfig {
  numSteps = 5;
  opacity = 0.15;
  opacityPow = 1.2;
  offset = 0.15;
  offsetPow = 1.8;
  blur = 40;
  blurPow = 1.0;
  shadowRGB: Color = new Color(0, 0, 0);

  constructor(settings?: ShineConfigSettings) {
    if (settings) {
      this.applyValues(settings);
    }
  }

  applyValues(settings: ShineConfigSettings): void {
    if (!settings) {
      return;
    }

    for (const key in this) {
      if (key in settings) {
        (this as any)[key] = (settings as any)[key];
      }
    }
  }
}
