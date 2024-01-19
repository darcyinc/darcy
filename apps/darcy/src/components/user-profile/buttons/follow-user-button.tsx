'use client';

import LoadingSpinner from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useState } from 'react';

export default function UserFollowButton({ handle }: { handle: string }) {
  // TODO: Implement follow functionality
  const [fakeLoading, setFakeLoading] = useState(false);
  const currentUser = useCurrentUser();

  if (!currentUser.token || currentUser.handle === handle) return null;

  const handleFollow = () => {
    setFakeLoading(true);
    setTimeout(() => setFakeLoading(false), 1000);
  };

  return (
    <Button variant="secondary" className="rounded-full font-bold gap-2" size="md" onClick={handleFollow}>
      {fakeLoading && <LoadingSpinner />}
      Seguir
    </Button>
  );
}
