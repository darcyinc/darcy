'use client';

import { PropsWithChildren } from 'react';

import { updateToken } from '@/api/base';
import { useTheme } from '@/hooks/useTheme';

export default function Providers({ children }: PropsWithChildren) {
  const { theme } = useTheme();

  if (typeof window !== 'undefined') {
    document.documentElement.dataset.theme = theme;

    updateToken(localStorage.getItem('token')!);

    // Automatically update the token when it changes in another tab
    window.addEventListener('storage', (event) => {
      if (event.storageArea === localStorage && event.key === 'token') updateToken(event.newValue!);
    });
  }

  return children;
}
