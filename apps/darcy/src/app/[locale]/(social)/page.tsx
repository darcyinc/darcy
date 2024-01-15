'use client';

import { apiClient } from '@/api/client';
import { GetPopularPostsResponse } from '@/app/api/popular-posts/route';
import Feed, { FeedFilter, FeedHeader, FeedPost, FeedPostComposer, FeedPostLoader } from '@/components/Feed';
import MobileNavbarProfile from '@/components/Navbar/NavbarProfile/MobileNavbarProfile';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useCallback, useState } from 'react';

export default function Home() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState<GetPopularPostsResponse[]>([]);
  const currentUser = useCurrentUser();

  const handleLoadMore = useCallback(async () => {
    if (!hasMore) return;

    setPage((prev) => prev + 1);

    if (currentUser.token) {
      const response = await apiClient.get(`/popular-posts?page=${page}`);
      setPosts((prev) => [...prev, ...response.data]);

      if (response.data.length === 0) setHasMore(false);
      return;
    }

    const response = await apiClient.get(`/popular-posts?page=${page}`);
    setPosts((prev) => [...prev, ...response.data]);

    if (response.data.length === 0) setHasMore(false);
  }, [page, hasMore, currentUser]);

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

      {/* TODO */}
      <FeedPostLoader onVisible={handleLoadMore} />
    </Feed>
  );
}
