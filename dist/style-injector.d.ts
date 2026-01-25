export declare class StyleInjector {
    private injections;
    private static instance;
    private constructor();
    static getInstance(): StyleInjector;
    inject(css: string, doc?: Document): HTMLStyleElement | undefined;
}
