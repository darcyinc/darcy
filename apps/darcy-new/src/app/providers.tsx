'use client';

import { PropsWithChildren } from 'react';

import { useTheme } from '@/hooks/theme';

const updateToken_stub = (token: string) => {
  return token;
};

export default function Providers({ children }: PropsWithChildren) {
  const { theme } = useTheme();

  if (typeof window !== 'undefined') {
    document.documentElement.dataset.theme = theme;

    updateToken_stub(localStorage.getItem('token')!);

    // Automatically update the token when it changes in another tab
    window.addEventListener('storage', (event) => {
      if (event.storageArea === localStorage && event.key === 'token') updateToken_stub(event.newValue!);
    });
  }

  return children;
}
