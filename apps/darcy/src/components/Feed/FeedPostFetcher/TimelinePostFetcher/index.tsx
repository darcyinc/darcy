'use client';

import { GetPopularPostsResponse } from '@/app/api/popular-posts/route';
import { GetPostResponse } from '@/app/api/post/[postId]/route';
import { GetUserPostsResponse } from '@/app/api/users/[handle]/posts/route';
import usePopularPosts from '@/hooks/api/usePopularPosts';
import { useEffect, useState } from 'react';
import FeedPost from '../../FeedPost';
import FeedPostComposer from '../../FeedPostComposer';
import FeedPostLoader from '../../FeedPostLoader';

export default function TimelinePostFetcher() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState<GetPopularPostsResponse>([]);

  // TODO: don't use usePopularPosts for authenticated users
  const { data, loading } = usePopularPosts({ page });

  useEffect(() => {
    if (loading) return;
    if (data.length === 0) return setHasMore(false);

    setPosts((prev) => {
      if (prev.length === 0) return data;
      return [...prev, ...data];
    });
  }, [data, loading]);

  if (page === 1 && loading) {
    return <FeedPostComposer />;
  }

  const updatePostData = (postId: string, newData: Partial<GetUserPostsResponse>) => {
    setPosts((prev) => {
      const index = prev.findIndex((post) => post.id === postId);
      const post = prev[index];

      return [...prev.slice(0, index), { ...post, ...newData }, ...prev.slice(index + 1)];
    });
  };

  const handleLoadMore = () => {
    if (loading || !hasMore) return;
    setPage((prev) => prev + 1);
  };

  const onComposerPublish = (data: GetPostResponse) => setPosts((prev) => [data, ...prev]);

  return (
    <>
      <FeedPostComposer onPublish={onComposerPublish} />

      {posts.map((post) => (
        <FeedPost
          hasLiked={post.hasLiked}
          hasReposted={false}
          avatar={post.author.avatarUrl}
          comments={post.commentCount}
          content={post.content}
          createdAt={post.createdAt}
          handle={post.author.handle}
          likes={post.likeCount}
          postId={post.id}
          username={post.author.displayName}
          reposts={0}
          views={0}
          key={post.id}
          updatePostData={updatePostData}
        />
      ))}

      <FeedPostLoader onVisible={handleLoadMore} />
    </>
  );
}
