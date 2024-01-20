'use client';

import { GetUserResponse } from '@/app/api/users/[handle]/route';
import { FeedHeader } from '@/components/feed';
import { UserPostFetcher } from '@/components/feed/feed-fetcher';
import UserProfile from '@/components/user-profile';
import useUser from '@/hooks/api/useUser';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface HomeProps {
  params: {
    handle: string;
  };
}

export default function Home({ params }: HomeProps) {
  const router = useRouter();
  const handle = decodeURIComponent(params.handle);
  const currentUser = useCurrentUser();
  const [userData, setUserData] = useState({} as GetUserResponse);

  if (handle.startsWith('@')) {
    router.replace(`/${handle.replace('@', '')}`);
    return null;
  }

  const { data, error } = useUser(handle);

  useEffect(() => {
    setUserData(data);
  }, [data]);

  useEffect(() => {
    if (currentUser.handle === handle) {
      const { bio, displayName, handle } = currentUser;
      updateUserData({
        bio,
        displayName,
        handle
      });
    }
  }, [currentUser, handle]);

  const updateUserData = (e: Partial<GetUserResponse>) => {
    setUserData((prev) => ({
      ...prev,
      ...e
    }));
  };

  // if userData is empty, means we are loading initial data
  if (!userData?.handle || error) {
    return (
      <>
        <FeedHeader className="flex items-center gap-4 p-2 backdrop-blur-md">
          <Link className="rounded-full hover:bg-accent p-2" href="/">
            <ArrowLeft size={20} />
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
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h1 className="text-lg font-bold">{data.displayName}</h1>
          <p className="text-sm text-muted-foreground">{data.postCount} posts</p>
        </div>
      </FeedHeader>

      <UserProfile {...userData} updateUserData={updateUserData} bannerUrl="https://picsum.photos/800/200" />

      <UserPostFetcher userData={userData} handle={handle} />
    </>
  );
}
