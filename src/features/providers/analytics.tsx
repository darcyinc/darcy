'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { PropsWithChildren } from 'react';

export default function AnalyticsProvider({ children }: PropsWithChildren) {
  return (
    <>
      <SpeedInsights />
      <Analytics />
      {children}
    </>
  );
}
