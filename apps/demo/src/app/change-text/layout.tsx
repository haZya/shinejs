import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shine Change-Text Demo",
  description: "Change-text demo for shinejs-react",
};

export default function ChangeTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>{children}</>
  );
}
