import { Metadata } from 'next';

import Feed from '@/components/Feed';
import { DESCRIPTION } from '@/util/constants';

export const metadata: Metadata = {
  title: 'Search | Darcy',
  description: DESCRIPTION,
  keywords: ['social network', 'open source']
};

export default function Home() {
  return <Feed />;
}
