'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const Modal = dynamic(() => import('@/components/Modal'));

export default function UserBannerAvatar({ avatar, banner }: { avatar: string; banner: string }) {
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);

  return (
    <div className="relative">
      {avatarModalOpen && (
        <Modal onClose={() => setAvatarModalOpen(false)}>
          <div className="max-h-[220px] max-w-[220px] sm:max-h-[320px] sm:max-w-[320px]">
            <img alt="User profile avatar" className="rounded-full" decoding="async" height={320} loading="lazy" src={avatar} width={320} />
          </div>
        </Modal>
      )}

      <img alt="User banner" className="max-h-52 w-full object-cover" decoding="async" draggable={false} loading="lazy" src={banner} />

      <button
        className="absolute -bottom-[25%] ml-5 h-28 w-28 overflow-hidden rounded-full border-2 border-background transition-all duration-700 hover:border-gray-500 sm:-bottom-[50px] sm:h-32 sm:w-32"
        type="button"
        onClick={() => setAvatarModalOpen(true)}
      >
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <img alt="User profile picture" className="object-cover" decoding="async" draggable={false} loading="lazy" src={avatar} />
      </button>
    </div>
  );
}
