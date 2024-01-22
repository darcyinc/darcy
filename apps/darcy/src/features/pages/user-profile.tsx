'use client';

import { GetUserResponse } from '@/app/api/users/[handle]/route';
import { UserPostFetcher } from '@/components/feed/feed-fetcher';
import UserProfile from '@/components/user-profile';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useEffect, useState } from 'react';

interface UserProfilePageProps {
  data: GetUserResponse;
}

export default function UserProfilePage({ data }: UserProfilePageProps) {
  const currentUser = useCurrentUser();
  const [userData, setUserData] = useState(data);

  useEffect(() => {
    if (currentUser.handle === data.handle) {
      const { bio, displayName, handle } = currentUser;
      updateUserData({
        bio,
        displayName,
        handle
      });
    }
  }, [currentUser, data.handle]);

  const updateUserData = (e: Partial<GetUserResponse>) => {
    setUserData((prev) => ({
      ...prev,
      ...e
    }));
  };

  return (
    <>
      <UserProfile {...userData} updateUserData={updateUserData} bannerUrl="https://picsum.photos/800/200" />

      <UserPostFetcher userData={data} />
    </>
  );
}
