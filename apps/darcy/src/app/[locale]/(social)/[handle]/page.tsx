import { apiClient } from '@/api/client';
import { GetUserPostsResponse } from '@/app/api/users/[handle]/posts/route';
import { GetUserResponse } from '@/app/api/users/[handle]/route';
import { FeedHeader } from '@/components/feed';
import UserProfilePage from '@/features/pages/user-profile';
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

  const user = await apiClient.get<GetUserResponse>(`/users/${handle}`);

  if (user.status !== 200) {
    return <h1>not found</h1>;
  }

  if (user.data.private) {
    return <h1>private profile</h1>;
  }

  const posts = await apiClient.get<GetUserPostsResponse>(`/users/${handle}/posts`);

  return (
    <>
      <FeedHeader className="flex items-center gap-4 p-2 backdrop-blur-md">
        <Link className="rounded-full hover:bg-accent p-2" href="/">
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h1 className="text-lg font-bold">{user.data.displayName}</h1>
          <p className="text-sm text-muted-foreground">{user.data.postCount} posts</p>
        </div>
      </FeedHeader>

      {/* @ts-ignore */}
      <UserProfilePage data={{ ...user.data }} initialPosts={posts.data} />
    </>
  );
}
