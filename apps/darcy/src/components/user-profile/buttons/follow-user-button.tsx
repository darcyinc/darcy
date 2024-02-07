'use client';

import useFollowUser from '@/api/mutations/useFollowUser';
import { GetUserResponse } from '@/app/api/users/[handle]/route';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useTranslations } from 'next-intl';

interface UserFollowButtonProps {
  handle: string;
  isFollowing?: boolean;
  updateUserData?: (e: Partial<GetUserResponse>) => void;
}

export default function UserFollowButton({ handle, isFollowing, updateUserData }: UserFollowButtonProps) {
  const currentUser = useCurrentUser();
  const mutation = useFollowUser(handle);
  const t = useTranslations('UserProfile.Buttons');

  if (!currentUser.handle || currentUser.handle === handle) return null;

  const handleFollow = () => {
    updateUserData?.({ isFollowing: !isFollowing });

    mutation.mutate(
      { follow: !isFollowing },
      {
        onError: () => updateUserData?.({ isFollowing })
      }
    );
  };

  return (
    <Button variant={isFollowing ? 'outline' : 'secondary'} className="rounded-full font-bold gap-2" size="md" onClick={handleFollow}>
      {isFollowing ? t('following') : t('follow')}
    </Button>
  );
}
