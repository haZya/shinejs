export class Point {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  delta(p: Point): Point {
    return new Point(p.x - this.x, p.y - this.y);
  }
}
