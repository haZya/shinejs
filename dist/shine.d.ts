import type { ShineConfigSettings } from "./config";
import { ShineConfig } from "./config";
import { Light } from "./light";
import { Shadow } from "./shadow";
import { Splitter } from "./splitter";
export type ShadowProperty = "textShadow" | "boxShadow";
export declare class Shine {
    light: Light;
    config: ShineConfig;
    domElement: HTMLElement;
    classPrefix: string;
    shadowProperty: ShadowProperty;
    shadows: Shadow[];
    splitter: Splitter;
    areAutoUpdatesEnabled: boolean;
    private fnDrawHandler;
    constructor(domElement: HTMLElement, optConfig?: ShineConfigSettings, optClassPrefix?: string, optShadowProperty?: ShadowProperty);
    destroy(): void;
    draw(): void;
    updateContent(optText?: string): void;
    enableAutoUpdates(): void;
    disableAutoUpdates(): void;
    private getCSS;
    private getPrefixed;
    private elementHasTextOnly;
}
