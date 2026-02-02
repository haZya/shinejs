type AnyFunction = (...args: any[]) => any;

/**
 * Creates a debounced version of a function.
 * @param fnCallback The function to debounce.
 * @param delay The delay in milliseconds.
 * @param context The 'this' context for the function.
 * @returns A new function that delays execution until after `delay` ms have passed since the last call.
 */
export function debounce(fnCallback: AnyFunction, delay = 0, context?: any): AnyFunction {
  let timeoutId: number | undefined;

  return function (this: any, ...args: any[]) {
    const currentContext = context || this;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      fnCallback.apply(currentContext, args);
    }, delay);
  };
}
