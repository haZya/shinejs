import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shine Typography Demo",
  description: "Typography controls demo for shinejs",
};

export default function TypographyDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>{children}</>
  );
}
