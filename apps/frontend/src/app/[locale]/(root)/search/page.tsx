import { Metadata } from 'next';
import { DESCRIPTION } from '@/util/constants';

import Feed from '@/components/Feed';

export const metadata: Metadata = {
  title: 'Search | Darcy',
  description: DESCRIPTION,
  keywords: ['social network', 'open source']
};

export default function Home() {
  return <Feed />;
}
