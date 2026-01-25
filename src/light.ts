import { Point } from "./point";

export class Light {
  position: Point;
  intensity: number;

  constructor(position?: Point) {
    this.position = position || new Point(0, 0);
    this.intensity = 1.0;
  }
}
