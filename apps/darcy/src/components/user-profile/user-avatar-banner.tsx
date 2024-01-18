'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';

interface UserAvatarBannerProps {
  avatarUrl: string;
  bannerUrl?: string | null;
}

export default function UserAvatarBanner({ avatarUrl, bannerUrl }: UserAvatarBannerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-none bg-transparent justify-center">
          <img
            alt="User profile avatar"
            className="rounded-full"
            decoding="async"
            height={320}
            loading="lazy"
            src={avatarUrl}
            width={320}
          />
        </DialogContent>
      </Dialog>

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
