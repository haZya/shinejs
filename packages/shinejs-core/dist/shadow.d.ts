import type { Color } from "./color";
import type { ShineConfig } from "./config";
import type { Light } from "./light";
import { Point } from "./point";
export declare class Shadow {
    position: Point;
    domElement: HTMLElement;
    shadowProperty: "textShadow" | "boxShadow";
    constructor(domElement: HTMLElement);
    draw(light: Light, config: ShineConfig): void;
    getShadow(colorRGB: Color, opacity: number, offsetX: number, offsetY: number, blurRadius: number): string;
    drawShadows(shadows: string[]): void;
    recalculatePosition(): void;
}
