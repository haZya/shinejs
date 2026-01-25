import type { RefObject } from "react";
import type { ShineConfigSettings } from "./config";
import { Shine } from "./shine";
export type UseShineSettings = ShineConfigSettings & {
    followMouse?: boolean;
};
export type ShineUpdaterConfig = {
    content?: string;
    light?: {
        position?: {
            x: number;
            y: number;
        };
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
        shadowRGB?: {
            r: number;
            g: number;
            b: number;
        };
    };
};
export declare function useShine(ref: RefObject<HTMLElement | null>, config?: UseShineSettings): {
    shine: Shine | null;
    update: (newConfig: ShineUpdaterConfig) => void;
};
