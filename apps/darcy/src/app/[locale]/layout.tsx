import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';

import Providers from './providers';

const locales = new Set(['en-US', 'pt-BR']);

interface RootLayoutParams {
  params: {
    locale: string;
  };
}

export default async function RootLayout({ children, params }: PropsWithChildren<RootLayoutParams>) {
  // Show a 404 error if the user requests an unknown locale
  const isValidLocale = locales.has(params.locale);
  if (!isValidLocale) notFound();

  return <Providers>{children}</Providers>;
}
