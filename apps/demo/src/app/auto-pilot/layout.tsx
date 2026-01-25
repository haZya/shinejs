import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shine Auto-Pilot Demo',
  description: 'Auto-pilot demo for shinejs-react',
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
