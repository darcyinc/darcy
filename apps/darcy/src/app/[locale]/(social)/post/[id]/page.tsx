import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';

import Feed from '@/components/Feed';
import FeedHeader from '@/components/Feed/FeedHeader';
import FeedPost from '@/components/Feed/FeedPost';

export default function Home() {
  return (
    <Feed>
      <FeedHeader className="absolute flex items-center gap-4 p-4 backdrop-blur-md">
        <Link className="rounded-full p-2 text-textPrimary hover:bg-hoverEffect" href="/">
          <MdArrowBack className="h-7 w-7" />
        </Link>

        <div>
          <h1 className="text-xl font-bold text-textPrimary">Publicação</h1>
        </div>
      </FeedHeader>

      <div className="pt-20">
        <FeedPost
          hasLiked
          hasReposted
          avatar="https://picsum.photos/44/44.webp"
          comments={0}
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
          createdAt={Date.now()}
          handle="davipatricio"
          likes={0}
          postId="unknown"
          reposts={0}
          username="Davi Patricio"
          views={100}
        />
      </div>
    </Feed>
  );
}
