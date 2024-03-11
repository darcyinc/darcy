'use client';

import { ThemeProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';

export default function NextThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
