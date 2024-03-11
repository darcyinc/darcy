'use client';

import useUser from '@/api/queries/useUser';
import { UserPostFetcher } from '@/components/feed/feed-fetcher';
import UserProfile from '@/components/user-profile';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import type { GetUserPostsResponse } from '@/types/api/post';
import type { GetUserResponse } from '@/types/api/user';
import { useEffect, useState } from 'react';

interface UserProfilePageProps {
  initialData: GetUserResponse;
  initialPosts: GetUserPostsResponse;
}

export default function UserProfilePage({ initialData, initialPosts }: UserProfilePageProps) {
  const currentUser = useCurrentUser();
  const user = useUser(initialData.handle);
  const [userData, setUserData] = useState(initialData);

  useEffect(() => {
    if (currentUser.handle === initialData.handle) {
      const { bio, displayName, handle } = currentUser;
      updateUserData({
        bio,
        displayName,
        handle
      });
    }
  }, [currentUser, initialData.handle]);

  useEffect(() => {
    if (user.data) setUserData(user.data);
  }, [user.data]);

  const updateUserData = (e: Partial<GetUserResponse>) => {
    setUserData((prev) => ({
      ...prev,
      ...user.data,
      ...e
    }));
  };
  return (
    <>
      <UserProfile {...userData} updateUserData={updateUserData} bannerUrl="https://picsum.photos/800/200" />

      {/* TODO: handle private profiles */}
      {!currentUser.handle && initialData.private ? (
        <p>Private profile.</p>
      ) : (
        <UserPostFetcher userData={userData} initialPosts={initialPosts} />
      )}
    </>
  );
}
