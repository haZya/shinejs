/**
 * Represents a 2D point in a coordinate system.
 */
export class Point {
  x: number;
  y: number;

  /**
   * Creates a new Point.
   * @param x X coordinate. Defaults to 0.
   * @param y Y coordinate. Defaults to 0.
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Calculates the difference vector (delta) between this point and another point.
   * @param p The target point.
   * @returns A new Point representing (p.x - this.x, p.y - this.y).
   */
  delta(p: Point): Point {
    return new Point(p.x - this.x, p.y - this.y);
  }
}
