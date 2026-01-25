import type { RefObject } from "react";
import type { ShineConfigSettings } from "./config";
import { useCallback, useEffect, useState } from "react";
import { Color } from "./color";
import { Shine } from "./shine";

export type UseShineSettings = ShineConfigSettings & {
  lightPosition?: { x: number; y: number } | "followMouse";
};

export type ShineUpdaterConfig = {
  content?: string;
  light?: {
    position?: { x: number; y: number } | "followMouse";
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
  const [isFollowingMouse, setIsFollowingMouse] = useState(false);

  const configJson = config ? JSON.stringify(config) : "{}";

  useEffect(() => {
    if (ref.current) {
      const { lightPosition: initialLightPosition = "followMouse", ...shineConfig }: UseShineSettings = JSON.parse(configJson);
      const instance = new Shine(ref.current, shineConfig);
      setShineInstance(instance);

      if (initialLightPosition === "followMouse") {
        setIsFollowingMouse(true);
      }
      else if (typeof initialLightPosition === "object" && initialLightPosition.x !== undefined && initialLightPosition.y !== undefined) {
        setIsFollowingMouse(false);
        instance.light.position.x = initialLightPosition.x;
        instance.light.position.y = initialLightPosition.y;
      }
      else {
        setIsFollowingMouse(false);
      }

      return () => {
        instance.destroy();
      };
    }
  }, [ref, configJson]);

  useEffect(() => {
    if (!shineInstance)
      return;

    const handleMouseMove = (event: MouseEvent) => {
      if (shineInstance.light) {
        shineInstance.light.position.x = event.clientX;
        shineInstance.light.position.y = event.clientY;
        shineInstance.draw();
      }
    };

    if (isFollowingMouse) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [shineInstance, isFollowingMouse]);

  const update = useCallback((newConfig: ShineUpdaterConfig) => {
    if (!shineInstance)
      return;

    let needsRedraw = false;

    if (newConfig.content) {
      shineInstance.updateContent(newConfig.content);
      // updateContent calls draw() itself.
    }

    if (newConfig.light) {
      if (newConfig.light.position === "followMouse") {
        setIsFollowingMouse(true);
        needsRedraw = true; // Still needs redraw to reflect potential new state
      }
      else if (newConfig.light.position) {
        shineInstance.light.position.x = newConfig.light.position.x;
        shineInstance.light.position.y = newConfig.light.position.y;
        setIsFollowingMouse(false); // Disable mouse follow if position is explicitly set
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
  }, [shineInstance, setIsFollowingMouse]);

  return { shine: shineInstance, update };
}
