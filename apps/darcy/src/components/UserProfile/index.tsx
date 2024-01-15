import Button from '../Button';

import UserAvatarBanner from './UserAvatarBanner';
import UserBadge from './UserBadge';
import UserFollowStats from './UserFollowStats';
import UserProfileInformation from './UserProfileInformation';

interface UserProfileProps {
  name: string;
  avatarUrl: string;
  bannerUrl: string;
  bio: string;
  joinedAt?: number;
  job?: string;
  location?: string;
  website?: string;
  verified?: boolean;
  followers: number;
  following: number;
}

export default function UserProfile({
  name,
  avatarUrl,
  bannerUrl,
  bio,
  job,
  website,
  location,
  verified,
  followers,
  following
}: UserProfileProps) {
  return (
    <div>
      {/* User avatar & banner */}
      <section className="relative">
        <UserAvatarBanner avatarUrl={avatarUrl} bannerUrl={bannerUrl} />

        {/* TODO: Edit profile button, unfollow */}
        <div className="absolute -bottom-14 right-2.5 flex items-end justify-center sm:-bottom-14">
          <Button color="white" size="sm">
            <p>Seguir</p>
          </Button>
        </div>
      </section>

      {/* User info */}
      <section className="mt-[70px] flex flex-col gap-1 px-4">
        <div className="flex items-center gap-1">
          <h1 className="text-xl font-bold">{name}</h1>
          {verified && <UserBadge badge="verified" />}
        </div>

        <p>{bio}</p>

        <UserProfileInformation job={job} joinedAt={Date.now() - 999_000_000} location={location} website={website} />

        {/* Following & followers */}
        <UserFollowStats followers={followers} following={following} />
      </section>
    </div>
  );
}
