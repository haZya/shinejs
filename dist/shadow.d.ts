import type { Color } from "./color";
import type { ShineConfig } from "./config";
import type { Light } from "./light";
import { Point } from "./point";
export declare class Shadow {
    position: Point;
    domElement: HTMLElement;
    shadowProperty: string;
    private fnHandleViewportUpdate;
    private fnHandleWindowLoaded;
    constructor(domElement: HTMLElement);
    destroy(): void;
    draw(light: Light, config: ShineConfig): void;
    getShadow(colorRGB: Color, opacity: number, offsetX: number, offsetY: number, blurRadius: number): string;
    drawShadows(shadows: string[]): void;
    enableAutoUpdates(): void;
    disableAutoUpdates(): void;
    private handleViewportUpdate;
    private handleWindowLoaded;
}
