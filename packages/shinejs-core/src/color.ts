/**
 * Represents an RGB color.
 */
export class Color {
  /** Red component (0-255). */
  r: number;
  /** Green component (0-255). */
  g: number;
  /** Blue component (0-255). */
  b: number;

  /**
   * Creates a new Color instance.
   * @param r Red component (0-255). Defaults to 0.
   * @param g Green component (0-255). Defaults to 0.
   * @param b Blue component (0-255). Defaults to 0.
   */
  constructor(r = 0, g = 0, b = 0) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}
