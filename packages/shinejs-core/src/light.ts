import { Point } from "./point";

/**
 * Represents the light source for the shine effect.
 */
export class Light {
  /** The position of the light source. */
  position: Point;
  /** The intensity of the light (0.0 to 1.0+). */
  intensity: number;

  /**
   * Creates a new Light instance.
   * @param position Initial position of the light. Defaults to (0, 0).
   */
  constructor(position?: Point) {
    this.position = position || new Point(0, 0);
    this.intensity = 1.0;
  }
}
