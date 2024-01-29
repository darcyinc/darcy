'use client';

import UserAvatarModal from '@/features/modals/user-avatar';
import { useState } from 'react';

interface UserAvatarBannerProps {
  avatarUrl: string;
  bannerUrl?: string | null;
}

export default function UserAvatarBanner({ avatarUrl, bannerUrl }: UserAvatarBannerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <UserAvatarModal open={open} onOpenChange={setOpen} avatarUrl={avatarUrl} />

      <img alt="Banner" className="h-52 object-cover" draggable={false} src={bannerUrl ?? ''} />

      <button
        className="absolute -bottom-10 left-4 flex items-end justify-center sm:-bottom-16 md:left-5"
        type="button"
        onClick={() => setOpen(true)}
      >
        <img alt="Avatar" className="h-20 w-20 rounded-full border-2 border-black sm:h-32 sm:w-32" draggable={false} src={avatarUrl} />
      </button>
    </>
  );
}
