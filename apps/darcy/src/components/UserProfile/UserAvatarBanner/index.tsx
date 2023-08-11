'use client';

import { useState } from 'react';

import Modal from '@/components/Modal';

interface UserAvatarBannerProps {
  avatarUrl: string;
  bannerUrl: string;
}

export default function UserAvatarBanner({ avatarUrl, bannerUrl }: UserAvatarBannerProps) {
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);

  return (
    <section className="relative">
      {avatarModalOpen && (
        <Modal onClose={() => setAvatarModalOpen(false)}>
          <div className="max-h-[220px] max-w-[220px] sm:max-h-[320px] sm:max-w-[320px]">
            <img
              alt="User profile avatar"
              className="rounded-full"
              decoding="async"
              height={320}
              loading="lazy"
              src={avatarUrl}
              width={320}
            />
          </div>
        </Modal>
      )}

      <img alt="Banner" className="h-52 object-cover" draggable={false} src={bannerUrl} />

      <button
        className="absolute -bottom-10 left-4 flex items-end justify-center sm:-bottom-16 md:left-5"
        type="button"
        onClick={() => setAvatarModalOpen(true)}
      >
        <img alt="Avatar" className="h-20 w-20 rounded-full border-2 border-black sm:h-32 sm:w-32" draggable={false} src={avatarUrl} />
      </button>
    </section>
  );
}
