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

export function throttle(fnCallback: AnyFunction, delay = 0, context?: any): AnyFunction {
  let previousTimestamp = Number.NaN;
  let timeoutId: number | undefined;

  return function (this: any, ...args: any[]) {
    const currentContext = context || this;
    const currentTimestamp = window.performance.now();

    if (!Number.isNaN(previousTimestamp) && currentTimestamp < previousTimestamp + delay) {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(() => {
        previousTimestamp = currentTimestamp;
        fnCallback.apply(currentContext, args);
      }, delay);
    }
    else {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
      previousTimestamp = currentTimestamp;
      fnCallback.apply(currentContext, args);
    }
  };
}
