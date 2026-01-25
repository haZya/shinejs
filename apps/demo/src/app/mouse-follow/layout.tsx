import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shine Mouse-Follow Demo',
  description: 'Mouse-follow demo for shinejs-react',
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
