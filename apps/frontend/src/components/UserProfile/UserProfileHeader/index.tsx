import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { HiLockClosed, HiOutlineArrowLeft } from 'react-icons/hi';

import Button from '@/components/Button';

import UserBannerAvatar from './UserBannerAvatar';
import UserProfileHighlights from './UserHighlights';

interface UserProfileHeaderProps {
  username: string;
  posts: number;
  handle: string;
  bio: string;
  banner: string;
  avatar: string;
  isPrivate: boolean;
}

export default function UserProfileHeader({ username, isPrivate, posts, handle, bio, banner, avatar }: UserProfileHeaderProps) {
  const t = useTranslations('ProfileHeader');

  return (
    <header className="border-b border-grayBorder">
      <header className="flex w-full items-center gap-3 p-1 px-5">
        <Link
          className="flex h-10 w-10 items-center justify-center rounded-full text-textPrimary hover:bg-hoverEffect focus:bg-hoverEffect focus:ring"
          href="/"
        >
          <HiOutlineArrowLeft className="text-2xl" />
        </Link>

        <div>
          <h3 className="text-lg font-bold text-textPrimary">{username}</h3>
          <p className="text-sm text-textSecondary">{t('posts', { posts })}</p>
        </div>
      </header>

      <section>
        <UserBannerAvatar avatar={avatar} banner={banner} />

        <div className="ml-auto w-fit">
          {/* TODO: also become follow button */}
          <Button className="mr-3 mt-3 px-5" size="small" variant="transparent">
            {t('editProfile')}
          </Button>
        </div>

        <section className="px-5 py-1">
          <div>
            <h1 className="text-xl font-bold text-textPrimary">
              {username}
              {isPrivate && <HiLockClosed className="ml-1 inline-block" />}
            </h1>

            <p className="text-textSecondary">@{handle}</p>
            <p className="mt-1">{bio}</p>
          </div>

          <UserProfileHighlights />

          <div className="mt-3 flex gap-4 text-sm">
            <a className="text-textSecondary decoration-darkGray hover:underline" href="#following">
              <span className="mr-1 font-bold text-textPrimary">1</span>
              {t('following')}
            </a>
            <a className="text-textSecondary decoration-darkGray hover:underline" href="#followers">
              <span className="mr-1 font-bold text-textPrimary">1</span>
              {t('followers')}
            </a>
          </div>
        </section>
      </section>
    </header>
  );
}
