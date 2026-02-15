import type { ReactNode } from "react";

import { highlight } from "fumadocs-core/highlight";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";

import { CopyCodeButton } from "@/components/copy-code-button";

type PreviewCodeTabsProps = {
  code?: string;
  language?: string;
  codes?: Array<{
    title: string;
    code: string;
    language?: string;
  }>;
  children?: ReactNode;
  previewTitle?: string;
};

export async function PreviewCodeTabs({
  code,
  language = "tsx",
  codes,
  children,
  previewTitle = "Preview",
}: PreviewCodeTabsProps) {
  const codeItems = (codes?.length
    ? codes
    : code
      ? [{ code, language, title: "Code" }]
      : []);

  const highlightedCodes = await Promise.all(codeItems.map(async item => highlight(item.code.trim(), {
    lang: item.language || language,
  })));

  const tabItems = [
    ...(children ? [previewTitle] : []),
    ...codeItems.map(item => item.title),
  ];

  return (
    <Tabs items={tabItems} className="not-prose my-6 rounded-xl border">
      {children && (
        <Tab>
          <div className="p-4">{children}</div>
        </Tab>
      )}
      {highlightedCodes.map((highlightedCode, index) => (
        <Tab key={codeItems[index].title}>
          <div className="bg-fd-secondary/35 relative overflow-auto [&_.shiki]:m-0 [&_.shiki]:rounded-none [&_.shiki]:border-0 [&_.shiki]:p-4 [&_.shiki]:text-sm">
            <CopyCodeButton code={codeItems[index].code.trim()} />
            {highlightedCode}
          </div>
        </Tab>
      ))}
    </Tabs>
  );
}
