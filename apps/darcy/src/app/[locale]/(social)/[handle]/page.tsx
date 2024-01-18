'use client';

import { FeedHeader } from '@/components/feed';
import { UserPostFetcher } from '@/components/feed/feed-fetcher';
import UserProfile from '@/components/user-profile';
import useUser from '@/hooks/api/useUser';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';

interface HomeProps {
  params: {
    handle: string;
  };
}

export default function Home({ params }: HomeProps) {
  const { data: userData, error, loading } = useUser(params.handle);

  if (loading || error) {
    return (
      <>
        <FeedHeader className="flex items-center gap-4 p-2 backdrop-blur-md">
          <Link className="rounded-full hover:bg-accent p-2" href="/">
            <MdArrowBack className="h-5 w-5" />
          </Link>
        </FeedHeader>

        {error && <p className="text-center mt-2 text-xl">User not found.</p>}
      </>
    );
  }

  return (
    <>
      <FeedHeader className="flex items-center gap-4 p-2 backdrop-blur-md">
        <Link className="rounded-full hover:bg-accent p-2" href="/">
          <MdArrowBack className="h-5 w-5" />
        </Link>

        <div>
          <h1 className="text-lg font-bold">{userData.displayName}</h1>
          <p className="text-sm text-muted-foreground">{userData.postCount} posts</p>
        </div>
      </FeedHeader>

      <UserProfile {...userData} bannerUrl="https://picsum.photos/800/200" />

      <UserPostFetcher userData={userData} handle={params.handle} />
    </>
  );
}
