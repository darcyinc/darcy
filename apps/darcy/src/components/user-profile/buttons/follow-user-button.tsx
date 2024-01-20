'use client';

import { apiClient } from '@/api/client';
import { GetUserResponse } from '@/app/api/users/[handle]/route';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/useCurrentUser';

interface UserFollowButtonProps {
  handle: string;
  isFollowing?: boolean;
  updateUserData?: (e: Partial<GetUserResponse>) => void;
}

export default function UserFollowButton({ handle, isFollowing, updateUserData }: UserFollowButtonProps) {
  const currentUser = useCurrentUser();

  if (!currentUser.token || currentUser.handle === handle) return null;

  const handleFollow = () => {
    updateUserData?.({ isFollowing: !isFollowing });

    apiClient[isFollowing ? 'delete' : 'post'](`/users/${handle}/follow`).then((response) => {
      // TODO: add toasts
      if (response.status !== 200) {
        return updateUserData?.({ isFollowing });
      }
    });
  };

  return (
    <Button variant={isFollowing ? 'outline' : 'secondary'} className="rounded-full font-bold gap-2" size="md" onClick={handleFollow}>
      {isFollowing ? 'Seguindo' : 'Seguir'}
    </Button>
  );
}
