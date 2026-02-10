import type { HTMLAttributes, ReactElement, ReactNode, Ref } from "react";

import { createElement, useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { ShineOptions } from "../index";

import { Shine as ShineCore } from "../index";
import { createUpdatePayload } from "./options-diff";

type ShineTagName = keyof HTMLElementTagNameMap;

export type ShineProps = {
  /** HTML tag to render, for example `h1`, `h2`, `p`, or `div`. */
  as?: ShineTagName;
  /** Shine configuration applied on mount and via diffed updates. */
  config?: ShineOptions;
  /** Element content. Text/number children are mapped to `config.content`. */
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
} & Omit<HTMLAttributes<HTMLElement>, "children">;

/**
 * React component wrapper for Shine that keeps a single imperative instance.
 *
 * It creates `Shine` once when mounted, destroys on unmount, and applies
 * prop changes through diffed `shine.update(...)` calls.
 */
export function Shine({ as = "div", config, children, ref, ...props }: ShineProps): ReactElement {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const shineRef = useRef<ShineCore | null>(null);
  const latestOptionsRef = useRef<ShineOptions | undefined>(undefined);
  const previousOptionsRef = useRef<ShineOptions | undefined>(undefined);

  const mergedConfig = useMemo<ShineOptions | undefined>(() => {
    if (typeof children === "string" || typeof children === "number") {
      return {
        ...config,
        content: String(children),
      };
    }

    return config;
  }, [config, children]);

  const setRefs = useCallback((node: HTMLElement | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!ref) {
      return;
    }

    if (typeof ref === "function") {
      ref(element);
    }
    else {
      ref.current = element;
    }

    return () => {
      if (typeof ref === "function") {
        ref(null);
      }
      else {
        ref.current = null;
      }
    };
  }, [ref, element]);

  latestOptionsRef.current = mergedConfig;

  useEffect(() => {
    if (!element || !element.ownerDocument?.defaultView) {
      return;
    }

    const instance = new ShineCore(element, latestOptionsRef.current);
    shineRef.current = instance;
    previousOptionsRef.current = latestOptionsRef.current;

    return () => {
      if (shineRef.current === instance) {
        shineRef.current = null;
      }
      previousOptionsRef.current = undefined;
      instance.destroy();
    };
  }, [element]);

  useEffect(() => {
    const instance = shineRef.current;
    if (!instance) {
      return;
    }

    const previousOptions = previousOptionsRef.current;
    const updatePayload = createUpdatePayload(previousOptions, mergedConfig);

    if (updatePayload) {
      instance.update(updatePayload);
    }

    if (previousOptions?.content !== undefined && mergedConfig?.content === undefined) {
      instance.updateContent();
    }

    previousOptionsRef.current = mergedConfig;
  }, [mergedConfig]);

  return createElement(as, {
    ...props,
    ref: setRefs,
    children,
  });
}
