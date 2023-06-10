import { Metadata } from 'next';

import Feed from '@/components/Feed';

export const metadata: Metadata = {
  title: 'Search | Darcy',
  description:
    'Darcy is an open source social network where you can share your thoughts and opinions with other people.',
  keywords: ['social network', 'open source'],
};

export default async function Home() {
  return (
    <>
      <Feed />
    </>
  );
}
