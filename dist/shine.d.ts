import type { ShineConfigSettings } from "./config";
import { ShineConfig } from "./config";
import { Light } from "./light";
import { Point } from "./point";
import { Shadow } from "./shadow";
import { Splitter } from "./splitter";
export type ShadowProperty = "textShadow" | "boxShadow";
export type ShineOptions = {
    config?: ShineConfigSettings;
    light?: {
        position?: Point | "followMouse";
        intensity?: number;
    };
    classPrefix?: string;
    shadowProperty?: ShadowProperty;
    content?: string;
};
export declare class Shine {
    light: Light;
    config: ShineConfig;
    domElement: HTMLElement;
    classPrefix: string;
    shadowProperty: ShadowProperty;
    shadows: Shadow[];
    splitter: Splitter;
    areAutoUpdatesEnabled: boolean;
    private rafId;
    private handleAutoUpdate;
    private unsubscribeMouseMonitor;
    constructor(domElement: HTMLElement, options?: ShineOptions);
    destroy(): void;
    draw(): void;
    recalculatePositions(): void;
    updateContent(optText?: string): void;
    enableAutoUpdates(): void;
    disableAutoUpdates(): void;
    enableMouseTracking(): void;
    disableMouseTracking(): void;
    private getCSS;
    private elementHasTextOnly;
}
