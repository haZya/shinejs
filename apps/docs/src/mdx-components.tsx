import type { MDXComponents } from "mdx/types";

import defaultMdxComponents from "fumadocs-ui/mdx";

import {
  AutoPilotPreview,
  BoxShadowChildrenPreview,
  ChangeContentPreview,
  DirectClassUsagePreview,
  DynamicUpdateColorPreview,
  DynamicUpdateConfigPreview,
  DynamicUpdateContentPreview,
  DynamicUpdateLightPreview,
  LightIntensityPreview,
  LightPositionFixedPointPreview,
  LightPositionFollowMousePreview,
  MouseFollowPreview,
  PlaygroundPreview,
  ReactUseShineGuidePreview,
  ShadowRgbPreview,
  TextVsChildrenPreview,
} from "@/components/example-previews";
import { PreviewCodeTabs } from "@/components/preview-code-tabs";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    AutoPilotPreview,
    BoxShadowChildrenPreview,
    ChangeContentPreview,
    DirectClassUsagePreview,
    DynamicUpdateColorPreview,
    DynamicUpdateConfigPreview,
    DynamicUpdateContentPreview,
    DynamicUpdateLightPreview,
    LightIntensityPreview,
    LightPositionFixedPointPreview,
    LightPositionFollowMousePreview,
    MouseFollowPreview,
    PlaygroundPreview,
    PreviewCodeTabs,
    ReactUseShineGuidePreview,
    ShadowRgbPreview,
    TextVsChildrenPreview,
    ...components,
  };
}
