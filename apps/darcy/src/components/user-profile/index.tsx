import { GetUserResponse } from '@/app/api/users/[handle]/route';
import UserBadge from './badge';
import { UserEditButton, UserFollowButton } from './buttons';
import UserFollowStats from './follow-stats';
import UserProfileInformation from './profile-information';
import UserAvatarBanner from './user-avatar-banner';

type UserProfileProps = Omit<GetUserResponse, 'updatedAt'> & { updateUserData: (data: Partial<GetUserResponse>) => void };

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
  followingCount,
  isFollowing,
  updateUserData
}: UserProfileProps) {
  return (
    <div className="border-b border-b-border pb-4">
      {/* User avatar & banner */}
      <section className="relative">
        <UserAvatarBanner {...{ avatarUrl, bannerUrl }} />

        {/* TODO: Edit profile button, unfollow */}
        <div className="absolute -bottom-14 right-2.5 flex items-end justify-center sm:-bottom-14">
          <UserFollowButton {...{ handle, isFollowing, updateUserData }} />
          <UserEditButton handle={handle} />
        </div>
      </section>

      {/* User info */}
      <section className="mt-[70px] flex flex-col gap-1 px-4">
        <div className="flex items-center gap-1">
          <h1 className="text-xl font-bold">{displayName}</h1>
          {verified !== 'NONE' && <UserBadge badge={verified} />}
        </div>

        <p className="text-muted-foreground">@{handle}</p>

        <p>{bio}</p>

        <UserProfileInformation {...{ job, createdAt, location, website }} />

        {/* Following & followers */}
        <UserFollowStats followers={followersCount} following={followingCount} />
      </section>
    </div>
  );
}
