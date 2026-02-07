import type { ReactNode } from "react";

import { highlight } from "fumadocs-core/highlight";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";

type PreviewCodeTabsProps = {
  code: string;
  language?: string;
  children: ReactNode;
};

export async function PreviewCodeTabs({ code, language = "tsx", children }: PreviewCodeTabsProps) {
  const highlightedCode = await highlight(code.trim(), {
    lang: language,
  });

  return (
    <Tabs items={["Preview", "Code"]} className="not-prose my-6 rounded-xl border">
      <Tab>
        <div className="p-4">{children}</div>
      </Tab>
      <Tab>
        <div className="bg-fd-secondary/35 overflow-auto [&_.shiki]:m-0 [&_.shiki]:rounded-none [&_.shiki]:border-0 [&_.shiki]:p-4 [&_.shiki]:text-sm">
          {highlightedCode}
        </div>
      </Tab>
    </Tabs>
  );
}
