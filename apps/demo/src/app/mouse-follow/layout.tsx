import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shine Mouse-Follow Demo",
  description: "Mouse-follow demo for shinejs-react",
};

export default function MouseFollowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>{children}</>
  );
}
