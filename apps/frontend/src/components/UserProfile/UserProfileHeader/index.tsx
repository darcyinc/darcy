import { useTranslations } from 'next-intl';
import { ProfileHeader } from './styles';

interface UserProfileHeaderProps {
  username: string;
  posts: number;
  handle: string;
  bio: string;
  banner: string;
  avatar: string;
}

export default function UserProfileHeader({
  username,
  posts,
  handle,
  bio,
  banner,
  avatar,
}: UserProfileHeaderProps) {
  const t = useTranslations('ProfileHeader');

  return (
    <>
      <ProfileHeader>
        <h3>{username}</h3>
        <p>{t('posts', { posts })}</p>
      </ProfileHeader>
      {handle} {bio} {banner} {avatar}
    </>
  );
}
