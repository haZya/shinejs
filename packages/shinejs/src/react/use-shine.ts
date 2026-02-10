import type { RefObject } from "react";

import { useCallback, useEffect, useRef, useState } from "react";

import type { ShineOptions } from "../index";

import { Shine } from "../index";
import { createUpdatePayload } from "./options-diff";

/**
 * React hook to apply the Shine effect to an element.
 *
 * @param ref Reference to the target HTML element.
 * @param config Optional configuration for the Shine effect.
 * @returns An object containing the Shine instance and an update function.
 */
export function useShine(
  ref: RefObject<HTMLElement | null>,
  config?: ShineOptions,
): { shine: Shine | null; update: (newConfig: ShineOptions) => void } {
  const [shineInstance, setShineInstance] = useState<Shine | null>(null);
  const shineInstanceRef = useRef<Shine | null>(null);
  const latestOptionsRef = useRef<ShineOptions | undefined>(config);
  const previousOptionsRef = useRef<ShineOptions | undefined>(undefined);

  latestOptionsRef.current = config;

  useEffect(() => {
    const element = ref.current;
    if (!element || !element.ownerDocument?.defaultView) {
      return;
    }

    const instance = new Shine(element, latestOptionsRef.current);
    shineInstanceRef.current = instance;
    previousOptionsRef.current = latestOptionsRef.current;
    setShineInstance(instance);

    return () => {
      if (shineInstanceRef.current) {
        shineInstanceRef.current.destroy();
        shineInstanceRef.current = null;
      }
      previousOptionsRef.current = undefined;
      setShineInstance(null);
    };
  }, [ref]);

  useEffect(() => {
    const instance = shineInstanceRef.current;
    if (!instance) {
      return;
    }

    const previousOptions = previousOptionsRef.current;
    const updatePayload = createUpdatePayload(previousOptions, config);

    if (updatePayload) {
      instance.update(updatePayload);
    }

    if (previousOptions?.content !== undefined && config?.content === undefined) {
      instance.updateContent();
    }

    previousOptionsRef.current = config;
  }, [config]);

  const update = useCallback((newConfig: ShineOptions) => {
    if (shineInstanceRef.current) {
      shineInstanceRef.current.update(newConfig);
      previousOptionsRef.current = {
        ...previousOptionsRef.current,
        ...newConfig,
      };
    }
  }, []);

  return { shine: shineInstance, update };
}
