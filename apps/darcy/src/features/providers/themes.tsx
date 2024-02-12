'use client';

import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

export default function NextThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
