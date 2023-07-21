import { PropsWithChildren } from 'react';

import Providers from './providers';

export default function RootLayout({ children }: PropsWithChildren) {
  return <Providers>{children}</Providers>;
}
