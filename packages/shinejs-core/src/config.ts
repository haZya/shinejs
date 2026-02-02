import { Color } from "./color";

/**
 * Configuration settings for the shine effect.
 */
export type ShineConfigSettings = {
  /** Number of shadow layers to generate. Higher numbers mean smoother shadows but more DOM elements. */
  numSteps?: number;
  /** Base opacity of the shadows (0.0 to 1.0). */
  opacity?: number;
  /** Exponent for opacity decay. Controls how fast opacity drops off. */
  opacityPow?: number;
  /** Offset distance for the shadows. */
  offset?: number;
  /** Exponent for offset distribution. */
  offsetPow?: number;
  /** Blur radius for the shadows. */
  blur?: number;
  /** Exponent for blur calculation. */
  blurPow?: number;
  /** The color of the shadow. */
  shadowRGB?: { r: number; g: number; b: number };
};

/**
 * Manages the configuration for a Shine instance.
 */
export class ShineConfig {
  numSteps = 5;
  opacity = 0.15;
  opacityPow = 1.2;
  offset = 0.15;
  offsetPow = 1.8;
  blur = 40;
  blurPow = 1.0;
  shadowRGB: Color = new Color();

  /**
   * Creates a new ShineConfig instance.
   * @param settings Optional initial settings to apply.
   */
  constructor(settings?: ShineConfigSettings) {
    if (settings) {
      this.applyValues(settings);
    }
  }

  /**
   * Applies new settings to the configuration.
   * @param settings The settings to apply.
   */
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
