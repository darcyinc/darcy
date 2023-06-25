import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { useLocale } from 'next-intl';

const Providers = dynamic(() => import('./providers'));

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Your Feed | Darcy',
  description:
    'Darcy is an open source social network where you can share your thoughts and opinions with other people.',
  keywords: ['social network', 'open source'],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  // eslint-disable-next-line unicorn/no-null
  const session = await getServerSession().catch(() => null);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
