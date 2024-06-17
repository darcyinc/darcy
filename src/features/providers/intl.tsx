import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { PropsWithChildren } from 'react';

export default async function IntlProvider({ children }: PropsWithChildren) {
  const messages = await getMessages();

  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
}
