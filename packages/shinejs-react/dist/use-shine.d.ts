import type { RefObject } from "react";
import type { ShineOptions } from "shinejs-core";
import { Shine } from "shinejs-core";
export declare function useShine(ref: RefObject<HTMLElement | null>, config?: ShineOptions): {
    shine: Shine | null;
    update: (newConfig: ShineOptions) => void;
};
