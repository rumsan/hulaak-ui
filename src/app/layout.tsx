import type { Metadata } from 'next';
import { QueryProvider } from '../../query/query-provider';
import { RSQueryProvider } from '../../query/rs-query-provider';

import './globals.css';

export const metadata: Metadata = {
  title: 'Maile.uk - Disposable mailbox',
  description:
    'Maile.uk is an open-source, disposable email service designed to handle email reception on port 25. It is similar to Mailinator service. It comes with a robust REST API to manage email inboxes, making it ideal for testing and temporary email needs. With Hulaak, developers can seamlessly manage disposable email accounts and interact with inboxes via a simple API.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">
        <QueryProvider>
          <RSQueryProvider>{children}</RSQueryProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
