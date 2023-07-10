'use client';

import { updateToken } from '@/api/base';
import { useTheme } from '@/hooks/useTheme';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const { theme } = useTheme();

  if (typeof window !== 'undefined') {
    document.documentElement.dataset.theme = theme;

    updateToken(localStorage.getItem('token'));

    // Automatically update the token when it changes in another tab
    window.addEventListener('storage', (event) => {
      if (event.storageArea === localStorage && event.key === 'token') updateToken(event.newValue);
    });
  }

  return children;
}
