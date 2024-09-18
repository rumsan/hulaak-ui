import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { QueryProvider } from '../../query/query-provider';
import { RSQueryProvider } from '../../query/rs-query-provider';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Maile.uk - Temporary and disposable email mailbox',
  description:
    'Rumsan Hulaak is an open-source, disposable email service designed to handle email reception on port 25. It is similar to Mailinator service. It comes with a robust REST API to manage email inboxes, making it ideal for testing and temporary email needs. With Hulaak, developers can seamlessly manage disposable email accounts and interact with inboxes via a simple API.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <RSQueryProvider>{children}</RSQueryProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
