import type { RefObject } from "react";
import type { ShineConfigSettings } from "./config";
import type { Point } from "./point";
import { Shine } from "./shine";
export type UseShineSettings = ShineConfigSettings & {
    lightPosition?: Point | "followMouse";
    lightIntensity?: number;
};
export type ShineUpdaterConfig = {
    content?: string;
    light?: {
        position?: Point | "followMouse";
        intensity?: number;
    };
    config?: ShineConfigSettings;
};
export declare function useShine(ref: RefObject<HTMLElement | null>, config?: UseShineSettings): {
    shine: Shine | null;
    update: (newConfig: ShineUpdaterConfig) => void;
};
