import { GetUserResponse } from '@/app/api/users/[handle]/route';
import Button from '../Button';
import UserAvatarBanner from './UserAvatarBanner';
import UserBadge from './UserBadge';
import UserFollowStats from './UserFollowStats';
import UserProfileInformation from './UserProfileInformation';

export default function UserProfile({
  displayName,
  avatarUrl,
  bannerUrl,
  bio,
  createdAt,
  handle,
  job,
  website,
  location,
  verified,
  followersCount,
  followingCount
}: Omit<GetUserResponse, 'updatedAt'>) {
  return (
    <div className="border-b border-b-grayBorder pb-4">
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
          <h1 className="text-xl font-bold">{displayName}</h1>
          {verified !== 'NONE' && <UserBadge badge={verified} />}
        </div>

        <p className="text-textSecondary">@{handle}</p>

        <p>{bio}</p>

        <UserProfileInformation job={job} createdAt={createdAt} location={location} website={website} />

        {/* Following & followers */}
        <UserFollowStats followers={followersCount} following={followingCount} />
      </section>
    </div>
  );
}
