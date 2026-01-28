import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shine Auto-Pilot Children Demo",
  description: "Auto-pilot demo for shinejs-react with child elements",
};

export default function AutoPilotChildrenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>{children}</>
  );
}
