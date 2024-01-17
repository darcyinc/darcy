'use client';

import Button from '@/components/button';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useState } from 'react';

export default function UserFollowButton({ handle }: { handle: string }) {
  // TODO: Implement follow functionality
  const [fakeLoading, setFakeLoading] = useState(false);
  const currentUser = useCurrentUser();

  if (currentUser.handle === handle) return null;

  const handleFollow = () => {
    setFakeLoading(true);
    setTimeout(() => setFakeLoading(false), 1000);
  };

  return (
    <div className="absolute -bottom-14 right-2.5 flex items-end justify-center sm:-bottom-14">
      <Button color="white" size="sm" onClick={handleFollow} loading={fakeLoading}>
        <p>Seguir</p>
      </Button>
    </div>
  );
}
