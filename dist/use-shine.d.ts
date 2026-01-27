import type { RefObject } from "react";
import type { ShineOptions } from "./shine";
import { Shine } from "./shine";
export declare function useShine(ref: RefObject<HTMLElement | null>, config?: ShineOptions): {
    shine: Shine | null;
    update: (newConfig: ShineOptions) => void;
};
