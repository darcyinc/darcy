import { GetUserResponse } from '@/app/api/users/[handle]/route';
import UserAvatarBanner from './UserAvatarBanner';
import UserBadge from './UserBadge';
import UserFollowButton from './UserFollowButton';
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
        <UserFollowButton handle={handle} />
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
