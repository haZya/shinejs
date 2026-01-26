import type { RefObject } from "react";
import type { ShineConfigSettings } from "./config";
import type { Point } from "./point";
import { useCallback, useEffect, useState } from "react";
import { Color } from "./color";
import { Shine } from "./shine";

export type UseShineSettings = ShineConfigSettings & {
  lightPosition?: Point | "followMouse";
  lightIntensity?: number;
};

export type ShineUpdaterConfig = {
  content?: string;
  light?: {
    position?: Point | "followMouse";
    intensity?: number;
  };
  config?: ShineConfigSettings;
};

export function useShine(ref: RefObject<HTMLElement | null>, config?: UseShineSettings) {
  const [shineInstance, setShineInstance] = useState<Shine | null>(null);

  // Simple deep-ish compare for config to prevent unnecessary re-initializations
  const configJson = config ? JSON.stringify(config) : "{}";

  useEffect(() => {
    if (ref.current) {
      const {
        lightPosition: initialLightPosition = "followMouse",
        lightIntensity,
        ...shineConfig
      }: UseShineSettings = JSON.parse(configJson);

      const instance = new Shine(ref.current, shineConfig);

      if (lightIntensity !== undefined) {
        instance.light.intensity = lightIntensity;
      }

      setShineInstance(instance);

      if (initialLightPosition === "followMouse") {
        instance.enableMouseTracking();
      }
      else if (
        typeof initialLightPosition === "object"
        && initialLightPosition.x !== undefined
        && initialLightPosition.y !== undefined
      ) {
        instance.light.position.x = initialLightPosition.x;
        instance.light.position.y = initialLightPosition.y;
        instance.draw();
      }
      else {
        instance.draw();
      }

      return () => {
        instance.destroy();
      };
    }
  }, [ref, configJson]);

  const update = useCallback(
    (newConfig: ShineUpdaterConfig) => {
      if (!shineInstance)
        return;

      let needsRedraw = false;

      if (newConfig.content) {
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
        const { shadowRGB, ...restConfig } = newConfig.config;
        const settingsToApply: ShineConfigSettings = { ...restConfig };

        if (shadowRGB) {
          settingsToApply.shadowRGB = new Color(shadowRGB.r, shadowRGB.g, shadowRGB.b);
        }

        shineInstance.config.applyValues(settingsToApply);
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
