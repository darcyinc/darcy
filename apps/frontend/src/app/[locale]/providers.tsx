'use client';

import { useEffect } from 'react';

import { updateToken } from '@/api/base';
import { useTheme } from '@/hooks/useTheme';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const { theme: userTheme } = useTheme();

  if (typeof window !== 'undefined') {
    updateToken(localStorage.getItem('token'));

    // Automatically update the token when it changes in another tab
    window.addEventListener('storage', (event) => {
      if (event.storageArea === localStorage && event.key === 'token') updateToken(event.newValue);
    });
  }

  useEffect(() => {
    async function loadTheme() {
      document.documentElement.dataset.theme = userTheme || 'dark';
    }

    loadTheme().catch(() => {});
  }, [userTheme]);

  return children;
}
