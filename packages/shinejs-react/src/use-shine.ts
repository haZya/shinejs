import type { RefObject } from "react";
import type { ShineOptions } from "shinejs-core";

import { useCallback, useEffect, useState } from "react";
import { Shine } from "shinejs-core";

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

  // Simple deep-ish compare for config to prevent unnecessary re-initializations
  const configJson = config ? JSON.stringify(config) : "{}";

  useEffect(() => {
    if (ref.current) {
      const shineConfig: ShineOptions = JSON.parse(configJson);
      const instance = new Shine(ref.current, shineConfig);

      setShineInstance(instance);

      return () => {
        instance.destroy();
      };
    }
  }, [configJson, ref]);

  const update = useCallback(
    (newConfig: ShineOptions) => {
      if (shineInstance) {
        shineInstance.update(newConfig);
      }
    },
    [shineInstance],
  );

  return { shine: shineInstance, update };
}
