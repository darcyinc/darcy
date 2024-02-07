'use client';

import * as Sentry from '@sentry/nextjs';
import NextError from 'next/error';
import { useEffect } from 'react';

interface LayoutProps {
  params: {
    locale: string;
  };
  error: Error & { digest?: string };
}

export default function GlobalError({ error, params }: LayoutProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang={params.locale}>
      <body>
        {/* This is the default Next.js error component but it doesn't allow omitting the statusCode property yet. */}
        {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
        <NextError statusCode={undefined as any} />
      </body>
    </html>
  );
}
