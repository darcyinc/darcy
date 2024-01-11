import { PropsWithChildren } from 'react';

import Providers from './providers';

export default async function RootLayout({ children }: PropsWithChildren) {
  return <Providers>{children}</Providers>;
}
