import { apiClient } from '@/api/client';
import { GetPostResponse } from '@/app/api/post/[postId]/route';
import { FeedHeader, FeedPost, FeedPostComposer } from '@/components/feed';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PostProps {
  params: {
    id: string;
  };
}

export default async function Post({ params }: PostProps) {
  const post = await apiClient.get(`post/${params.id}`, {
    throwHttpErrors: false
  });

  if (post.status !== 200) {
    notFound();
  }

  const data = (await post.json()) as GetPostResponse;

  return (
    <>
      <FeedHeader className="flex items-center gap-4 p-2">
        <Link className="rounded-full p-2 hover:bg-accent" href="/">
          <ArrowLeft size={28} />
        </Link>

        <div>
          <h1 className="text-xl font-bold">Publicação</h1>
        </div>
      </FeedHeader>

      <FeedPost
        content={data.content}
        username={data.author.displayName}
        handle={data.author.handle}
        avatar={data.author.avatarUrl}
        postId={data.id}
        verified={data.author.verified}
        mediaUrls={[]}
        views={0}
        reposts={0}
        likes={data.likeCount}
        comments={data.commentCount}
        // TODO
        hasReposted={false}
        hasLiked={data.hasLiked}
        createdAt={data.createdAt}
      />

      <FeedPostComposer queryKeys={['post', params.id, 'comments']} parentPostId={data.id} />
    </>
  );
}
