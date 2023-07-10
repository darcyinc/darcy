import { useTranslations } from 'next-intl';

interface UserProfileHeaderProps {
  username: string;
  posts: number;
  handle: string;
  bio: string;
  banner: string;
  avatar: string;
}

export default function UserProfileHeader({ username, posts, handle, bio, banner, avatar }: UserProfileHeaderProps) {
  const t = useTranslations('ProfileHeader');

  return (
    <>
      <header className="w-full border-b border-grayBorder px-5 py-4">
        <h3 className="text-xl font-bold text-textPrimary">{username}</h3>
        <p className="text-textSecondary">{t('posts', { posts })}</p>
      </header>
      {handle} {bio} {banner} {avatar}
    </>
  );
}
