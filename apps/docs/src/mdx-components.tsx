import type { MDXComponents } from "mdx/types";

import defaultMdxComponents from "fumadocs-ui/mdx";

import { PreviewCodeTabs } from "@/components/preview-code-tabs";
import {
  AutoPilotPreview,
  BoxShadowChildrenPreview,
  ChangeContentPreview,
  ChildrenBoxShadowPreview,
  DirectClassUsagePreview,
  DynamicUpdateColorPreview,
  DynamicUpdateConfigPreview,
  DynamicUpdateContentPreview,
  DynamicUpdateLightPreview,
  LightIntensityPreview,
  LightPositionAutoPilotPreview,
  LightPositionFixedPointPreview,
  LightPositionFollowMousePreview,
  MouseFollowPreview,
  PlaygroundPreview,
  ReactUseShineGuidePreview,
  ShadowRgbPreview,
  TextVsChildrenPreview,
  TypographyOptionsPreview,
} from "@/components/previews";

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
    LightPositionAutoPilotPreview,
    LightPositionFixedPointPreview,
    LightPositionFollowMousePreview,
    MouseFollowPreview,
    PlaygroundPreview,
    PreviewCodeTabs,
    ReactUseShineGuidePreview,
    ShadowRgbPreview,
    TextVsChildrenPreview,
    TypographyOptionsPreview,
    ChildrenBoxShadowPreview,
    ...components,
  };
}
