'use client';

import { FeedHeader, FeedPostComposer } from '@/components/Feed';
import UserPostFetcher from '@/components/Feed/FeedPostFetcher/UserPostFetcher';
import UserProfile from '@/components/UserProfile';
import useUser from '@/hooks/api/useUser';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';

interface HomeProps {
  params: {
    handle: string;
  };
}

export default function Home({ params }: HomeProps) {
  const currentUser = useCurrentUser();
  const { data: userData, error, loading } = useUser(params.handle);

  if (loading || error) {
    return (
      <>
        <FeedHeader className="flex items-center gap-4 p-2 backdrop-blur-md">
          <Link className="rounded-full text-textPrimary hover:bg-hoverEffect p-2" href="/">
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
        <Link className="rounded-full text-textPrimary hover:bg-hoverEffect p-2" href="/">
          <MdArrowBack className="h-5 w-5" />
        </Link>

        <div>
          <h1 className="text-lg font-bold text-textPrimary">{userData.displayName}</h1>
          <p className="text-sm text-textSecondary">{userData.postCount} posts</p>
        </div>
      </FeedHeader>

      <UserProfile {...userData} bannerUrl="https://picsum.photos/800/200" />

      {currentUser.handle === userData.handle && <FeedPostComposer showProfilePicture={false} />}

      <UserPostFetcher userData={userData} handle={params.handle} />
    </>
  );
}
