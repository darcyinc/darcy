'use client';

import { GetPopularPostsResponse } from '@/app/api/popular-posts/route';
import usePopularPosts from '@/hooks/api/usePopularPosts';
import { useEffect, useState } from 'react';
import FeedPost from '../../FeedPost';
import FeedPostLoader from '../../FeedPostLoader';

export default function TimelinePostFetcher() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState<GetPopularPostsResponse[]>([]);

  // TODO: don't use usePopularPosts for authenticated users
  const { data, loading } = usePopularPosts({ page });

  useEffect(() => {
    if (loading) return;
    if (data.length === 0) return setHasMore(false);
    setPosts((prev) => [...prev, ...data]);
  }, [data, loading]);

  const handleLoadMore = () => {
    if (!hasMore) return;
    setPage((prev) => prev + 1);
  };

  return (
    <>
      {posts.map((post) => (
        <FeedPost
          hasLiked={false}
          hasReposted={false}
          avatar={post.author.avatarUrl}
          comments={post.commentCount}
          content={post.content}
          createdAt={new Date(post.createdAt).getTime()}
          handle={post.author.handle}
          likes={post.likeCount}
          postId={post.id}
          username={post.author.displayName}
          reposts={0}
          views={0}
          key={post.id}
        />
      ))}

      <FeedPostLoader onVisible={handleLoadMore} />
    </>
  );
}
