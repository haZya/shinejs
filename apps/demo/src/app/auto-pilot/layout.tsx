import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shine Auto-Pilot Demo",
  description: "Auto-pilot demo for shinejs",
};

export default function AutoPilotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>{children}</>
  );
}
