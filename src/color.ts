export class Color {
  r: number;
  g: number;
  b: number;

  constructor(r = 0, g = 0, b = 0) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  static colorFromHex(hex: string): Color {
    const c = new Color();
    c.parseHex(hex);
    return c;
  }

  parseHex(hex: string): void {
    hex = hex.replace("#", "");
    const color = Number.parseInt(hex, 16);
    this.r = (color >> 16) & 0xFF;
    this.g = (color >> 8) & 0xFF;
    this.b = color & 0xFF;
  }

  getRGBAString(): string {
    return `rgba(${Math.round(this.r)},${Math.round(this.g)},${Math.round(this.b)}, 1.0)`;
  }
}
