import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';

import Feed from '@/components/Feed';
import FeedHeader from '@/components/Feed/FeedHeader';

export default function Home() {
  return (
    <Feed>
      <FeedHeader className="absolute flex items-center gap-4 p-4 backdrop-blur-md">
        <Link className="text-textPrimary hover:text-textSecondary" href="/">
          <MdArrowBack className="h-7 w-7" />
        </Link>

        <div>
          <h1 className="text-xl font-bold text-textPrimary">Davi Patricio</h1>
          <p className="text-sm text-textSecondary">@davipatricio</p>
        </div>
      </FeedHeader>
    </Feed>
  );
}
