import Button from '../Button';

import UserAvatarBanner from './UserAvatarBanner';
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
}

export default function UserProfile({ name, avatarUrl, bannerUrl, bio }: UserProfileProps) {
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
        <h1 className="text-xl font-bold">{name}</h1>
        <p>{bio}</p>

        <UserProfileInformation
          job="Software Engineer"
          joinedAt={Date.now() - 999_000_000}
          location="São Paulo, Brasil"
          website="https://davipatricio.vercel.appdavipatricio.vercel.appdavipatricio.vercel.appdavipatricio.vercel.app"
        />

        {/* Following & followers */}
        <UserFollowStats followers={12} following={32} />
      </section>
    </div>
  );
}
