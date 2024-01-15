'use client';

import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';

import { apiClient } from '@/api/client';
import { GetUserResponse } from '@/app/api/users/[handle]/route';
import Feed, { FeedPostComposer } from '@/components/Feed';
import FeedHeader from '@/components/Feed/FeedHeader';
import UserProfile from '@/components/UserProfile';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useEffect, useState } from 'react';

interface HomeProps {
  params: {
    username: string;
  };
}

export default function Home({ params }: HomeProps) {
  const currentUser = useCurrentUser();
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState<GetUserResponse>();

  useEffect(() => {
    apiClient.get(`/users/${params.username}`).then((response) => {
      if (response.status !== 200) return setError(true);
      setUserData(response.data);
    });
  }, [params]);

  if (error) {
    return (
      <Feed>
        <FeedHeader className="flex items-center gap-4 p-2 backdrop-blur-md">
          <Link className="rounded-full text-textPrimary hover:bg-hoverEffect p-2" href="/">
            <MdArrowBack className="h-5 w-5" />
          </Link>
        </FeedHeader>

        <p className="text-center mt-2 text-xl">User not found.</p>
      </Feed>
    );
  }

  if (!userData) {
    return (
      <Feed>
        <FeedHeader className="flex items-center gap-4 p-2 backdrop-blur-md">
          <Link className="rounded-full text-textPrimary hover:bg-hoverEffect p-2" href="/">
            <MdArrowBack className="h-5 w-5" />
          </Link>
        </FeedHeader>
      </Feed>
    );
  }

  return (
    <Feed>
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
    </Feed>
  );
}
