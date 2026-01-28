import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shine Dynamic Demo",
  description: "Demo showing the dynamic usage of Shine config options",
};

export default function DynamicDemoLayout({
  children,
}:
{
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
