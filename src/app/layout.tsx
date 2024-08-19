import type { Metadata } from 'next';

import { Alert } from '@/shared/ui';

import './globals.css';

export const metadata: Metadata = {
  title: '프라이빗 SNS, 소곤',
  description: '프라이빗 SNS, 소곤',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        {children}
        <Alert />
      </body>
    </html>
  );
}
