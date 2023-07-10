'use client';

import { useState } from 'react';

import Modal from '@/components/Modal';

interface UserBannerAvatar {
  avatar: string;
  banner: string;
}

export default function UserBannerAvatar({ avatar, banner }: UserBannerAvatar) {
  const [avatarModalOpen, setAvatarModalOpen] = useState(true);

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

      <button type="button" onClick={() => setAvatarModalOpen(true)}>
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <img
          alt="User profile picture"
          className="absolute -bottom-[50px] ml-5 h-20 w-20 rounded-full border border-background object-cover sm:h-32 sm:w-32"
          decoding="async"
          draggable={false}
          loading="lazy"
          src={avatar}
        />
      </button>
    </div>
  );
}
