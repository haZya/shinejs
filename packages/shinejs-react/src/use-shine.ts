import type { RefObject } from "react";
import type { ShineOptions } from "shinejs-core";

import { useCallback, useEffect, useState } from "react";
import { Shine } from "shinejs-core";

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
      if (!shineInstance)
        return;

      let needsRedraw = false;

      if (newConfig.content !== undefined) {
        shineInstance.updateContent(newConfig.content);
        // updateContent calls draw() internally
      }

      if (newConfig.light) {
        if (newConfig.light.position === "followMouse") {
          shineInstance.enableMouseTracking();
        }
        else if (newConfig.light.position) {
          shineInstance.disableMouseTracking();
          shineInstance.light.position.x = newConfig.light.position.x;
          shineInstance.light.position.y = newConfig.light.position.y;
          needsRedraw = true;
        }

        if (typeof newConfig.light.intensity === "number") {
          shineInstance.light.intensity = newConfig.light.intensity;
          needsRedraw = true;
        }
      }

      if (newConfig.config) {
        shineInstance.config.applyValues(newConfig.config);
        needsRedraw = true;
      }

      if (needsRedraw) {
        shineInstance.draw();
      }
    },
    [shineInstance],
  );

  return { shine: shineInstance, update };
}
