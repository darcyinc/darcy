import { notFound } from 'next/navigation';
import { useLocale } from 'next-intl';
import { PropsWithChildren } from 'react';

interface RootLayoutParams {
  params: {
    locale: string;
  };
}

export default function RootLayout({ children, params }: PropsWithChildren<RootLayoutParams>) {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  return children;
}
