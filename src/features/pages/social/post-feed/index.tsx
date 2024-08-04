'use client';

import useRecentPosts from '@/api/queries/use-recent-posts';
import Post from '@/components/feed/post';
import type { GetRecentPosts } from '@/types/api/posts';

interface PostFeedProps {
  fallbackData?: GetRecentPosts;
}

export default function PostFeed({ fallbackData }: PostFeedProps) {
  const posts = useRecentPosts({ fallbackData });

  return (
    <section className='flex flex-col border-r lg:border-r-0 min-h-screen w-full'>
      {posts.data?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  );
}
