'use client';

import { GetPopularPostsResponse } from '@/app/api/popular-posts/route';
import Feed, { FeedFilter, FeedHeader, FeedPost, FeedPostComposer, FeedPostLoader } from '@/components/Feed';
import MobileNavbarProfile from '@/components/Navbar/NavbarProfile/MobileNavbarProfile';
import usePopularPosts from '@/hooks/api/usePopularPosts';
import { useCallback, useEffect, useState } from 'react';

export default function Home() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState<GetPopularPostsResponse[]>([]);

  // TODO: don't use usePopularPosts for authenticated users
  const { data: popularPosts, loading } = usePopularPosts({ page });

  useEffect(() => {
    if (loading) return;
    if (popularPosts.length === 0) return setHasMore(false);
    setPosts((prev) => [...prev, ...popularPosts]);
  }, [popularPosts, loading]);

  const handleLoadMore = useCallback(async () => {
    if (!hasMore) return;
    setPage((prev) => prev + 1);
  }, [hasMore]);

  return (
    <Feed>
      <FeedHeader>
        <MobileNavbarProfile />
        <FeedFilter />
      </FeedHeader>

      <FeedPostComposer />

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
    </Feed>
  );
}
