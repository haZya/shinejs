import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shine Class Direct Usage Demo",
  description: "Demo showing direct usage of Shine class without the useShine hook",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>{children}</main>
  );
}
