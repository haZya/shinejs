import type { ShineOptions } from "../index";

export function createUpdatePayload(
  previousOptions: ShineOptions | undefined,
  nextOptions: ShineOptions | undefined,
): ShineOptions | null {
  if (!previousOptions && !nextOptions) {
    return null;
  }

  if (!previousOptions && nextOptions) {
    return nextOptions;
  }

  if (!nextOptions) {
    return null;
  }

  const payload: ShineOptions = {};

  if (!deepEqual(previousOptions?.content, nextOptions.content) && nextOptions.content !== undefined) {
    payload.content = nextOptions.content;
  }

  if (!deepEqual(previousOptions?.config, nextOptions.config) && nextOptions.config !== undefined) {
    payload.config = nextOptions.config;
  }

  if (!deepEqual(previousOptions?.light, nextOptions.light) && nextOptions.light !== undefined) {
    payload.light = nextOptions.light;
  }

  if (!deepEqual(previousOptions?.classPrefix, nextOptions.classPrefix) && nextOptions.classPrefix !== undefined) {
    payload.classPrefix = nextOptions.classPrefix;
  }

  if (!deepEqual(previousOptions?.shadowProperty, nextOptions.shadowProperty) && nextOptions.shadowProperty !== undefined) {
    payload.shadowProperty = nextOptions.shadowProperty;
  }

  return Object.keys(payload).length ? payload : null;
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) {
    return true;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (!a || !b || typeof a !== "object" || typeof b !== "object") {
    return false;
  }

  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
      return false;
    }

    return a.every((value, index) => deepEqual(value, b[index]));
  }

  const aObject = a as Record<string, unknown>;
  const bObject = b as Record<string, unknown>;
  const aKeys = Object.keys(aObject);
  const bKeys = Object.keys(bObject);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every(key => deepEqual(aObject[key], bObject[key]));
}
