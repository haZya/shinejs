import type { RefObject } from "react";
import type { ShineConfigSettings } from "./config";
import { useCallback, useEffect, useState } from "react";
import { Color } from "./color";
import { Shine } from "./shine";

export type UseShineSettings = ShineConfigSettings & {
  followMouse?: boolean;
};

export type ShineUpdaterConfig = {
  content?: string;
  light?: {
    position?: { x: number; y: number };
    intensity?: number;
  };
  config?: {
    numSteps?: number;
    opacity?: number;
    opacityPow?: number;
    offset?: number;
    offsetPow?: number;
    blur?: number;
    blurPow?: number;
    shadowRGB?: { r: number; g: number; b: number };
  };
};

export function useShine(ref: RefObject<HTMLElement | null>, config?: UseShineSettings) {
  const [shineInstance, setShineInstance] = useState<Shine | null>(null);

  const configJson = config ? JSON.stringify(config) : "{}";

  useEffect(() => {
    if (ref.current) {
      const { followMouse = true, ...shineConfig } = JSON.parse(configJson);
      const instance = new Shine(ref.current, shineConfig);
      setShineInstance(instance);

      if (followMouse) {
        const handleMouseMove = (event: MouseEvent) => {
          if (instance.light) {
            instance.light.position.x = event.clientX;
            instance.light.position.y = event.clientY;
            instance.draw();
          }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
          instance.destroy();
        };
      }

      return () => {
        instance.destroy();
      };
    }
  }, [ref, configJson]);

  const update = useCallback((newConfig: ShineUpdaterConfig) => {
    if (!shineInstance)
      return;

    let needsRedraw = false;

    if (newConfig.content) {
      shineInstance.updateContent(newConfig.content);
      // updateContent calls draw() itself.
    }

    if (newConfig.light) {
      if (newConfig.light.position) {
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
  }, [shineInstance]);

  return { shine: shineInstance, update };
}
