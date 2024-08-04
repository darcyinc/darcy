import { apiClient } from '@/api/client';
import PostFeed from '@/features/pages/social/post-feed';
import type { GetRecentPosts } from '@/types/api/posts';

async function getPosts() {
  const request = await apiClient.get('posts/recent');
  const { data: posts } = await request.json<{ data: GetRecentPosts }>();

  return posts;
}

export default async function Page() {
  const posts = await getPosts();

  return (
    <main className="max-w-[600px] h-full w-full">
      <PostFeed fallbackData={posts} />
    </main>
  );
}
