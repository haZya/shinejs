import type { RefObject } from "react";
import type { ShineConfigSettings } from "./config";
import type { Point } from "./point";
import { Color } from "./color";
import { Shine } from "./shine";
export type UseShineSettings = ShineConfigSettings & {
    lightPosition?: Point | "followMouse";
};
export type ShineUpdaterConfig = {
    content?: string;
    light?: {
        position?: Point | "followMouse";
        intensity?: number;
    };
    config?: {
        numSteps?: number;
        opacity?: number;
        opacityPow?: number;
        offset?: number;
        offsetPow?: number;
        blur?: number;
        blurPow?: number;
        shadowRGB?: Color;
    };
};
export declare function useShine(ref: RefObject<HTMLElement | null>, config?: UseShineSettings): {
    shine: Shine | null;
    update: (newConfig: ShineUpdaterConfig) => void;
};
