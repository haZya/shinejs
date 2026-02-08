import { DocsLayout } from "fumadocs-ui/layouts/docs";

import { source } from "@/lib/source";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout
      nav={{
        title: "ShineJS",
      }}
      tree={source.getPageTree()}
    >
      {children}
    </DocsLayout>
  );
}
