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
        <img alt="Banner" className="h-48 object-cover" draggable={false} src={bannerUrl} />

        <div className="absolute -bottom-14 left-4 flex items-end justify-center sm:-bottom-16 md:left-5">
          <img alt="Avatar" className="h-28 w-28 rounded-full border-4 border-white sm:h-32 sm:w-32" draggable={false} src={avatarUrl} />
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
      </section>
    </div>
  );
}
