type AnyFunction = (...args: any[]) => any;

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

