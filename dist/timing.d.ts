type AnyFunction = (...args: any[]) => any;
export declare function debounce(fnCallback: AnyFunction, delay?: number, context?: any): AnyFunction;
export declare function throttle(fnCallback: AnyFunction, delay?: number, context?: any): AnyFunction;
export {};
