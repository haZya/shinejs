import type { RefObject } from "react";

import { useCallback, useEffect, useRef, useState } from "react";

import type { ShineOptions } from "../index";

import { Shine } from "../index";

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

  // Simple deep-ish compare for config to prevent unnecessary re-initializations
  const configJson = config ? JSON.stringify(config) : "{}";

  useEffect(() => {
    if (ref.current) {
      const shineConfig: ShineOptions = JSON.parse(configJson);
      const instance = new Shine(ref.current, shineConfig);

      shineInstanceRef.current = instance;
      setShineInstance(instance);

      return () => {
        if (shineInstanceRef.current === instance) {
          shineInstanceRef.current = null;
        }
        instance.destroy();
        setShineInstance(prev => (prev === instance ? null : prev));
      };
    }
  }, [configJson, ref]);

  const update = useCallback(
    (newConfig: ShineOptions) => {
      if (shineInstanceRef.current) {
        shineInstanceRef.current.update(newConfig);
      }
    },
    [],
  );

  return { shine: shineInstance, update };
}
