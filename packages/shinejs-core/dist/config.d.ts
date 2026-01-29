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
export declare class ShineConfig {
    numSteps: number;
    opacity: number;
    opacityPow: number;
    offset: number;
    offsetPow: number;
    blur: number;
    blurPow: number;
    shadowRGB: Color;
    constructor(settings?: ShineConfigSettings);
    applyValues(settings: ShineConfigSettings): void;
}
