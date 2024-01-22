import { FeedHeader } from '@/components/feed';
import UserProfilePage from '@/features/pages/user-profile';
import { prisma } from '@/utils/api/prisma';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface HomeProps {
  params: {
    handle: string;
  };
}

export default async function Home({ params }: HomeProps) {
  const handle = decodeURIComponent(params.handle);

  if (handle.startsWith('@')) {
    // router.replace(`/${handle.replace('@', '')}`);
    return null;
  }

  const user = await prisma.user.findFirst({
    where: { handle }
  });

  if (!user) {
    return <h1>not</h1>;
  }

  return (
    <>
      <FeedHeader className="flex items-center gap-4 p-2 backdrop-blur-md">
        <Link className="rounded-full hover:bg-accent p-2" href="/">
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h1 className="text-lg font-bold">{user.displayName}</h1>
          <p className="text-sm text-muted-foreground">{user.postCount} posts</p>
        </div>
      </FeedHeader>

      {/* @ts-ignore */}
      <UserProfilePage data={{ ...user, isFollowing: true, followersCount: 0, followingCount: 0 }} />
    </>
  );
}
