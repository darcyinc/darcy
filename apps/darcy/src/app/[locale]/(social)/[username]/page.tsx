import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';

import Feed from '@/components/Feed';
import FeedHeader from '@/components/Feed/FeedHeader';
import UserProfile from '@/components/UserProfile';

export default function Home() {
  return (
    <Feed>
      <FeedHeader className="flex items-center gap-4 p-2 backdrop-blur-md">
        <Link className="rounded-full text-textPrimary hover:bg-hoverEffect p-2" href="/">
          <MdArrowBack className="h-5 w-5" />
        </Link>

        <div>
          <h1 className="text-lg font-bold text-textPrimary">Davi Patricio</h1>
          <p className="text-sm text-textSecondary">1,5 mil posts</p>
        </div>
      </FeedHeader>

      <div>
        <UserProfile
          verified
          avatarUrl="https://picsum.photos/200/200"
          bannerUrl="https://picsum.photos/800/200"
          bio="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
          location="São Paulo, Brasil"
          name="Davi Patricio"
          website="https://davipatricio.vercel.app"
        />
      </div>
    </Feed>
  );
}
