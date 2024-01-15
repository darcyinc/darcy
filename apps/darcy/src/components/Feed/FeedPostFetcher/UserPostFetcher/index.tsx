'use client';

import { GetUserPostsResponse } from '@/app/api/users/[handle]/posts/route';
import { GetUserResponse } from '@/app/api/users/[handle]/route';
import useUserPosts from '@/hooks/api/useUserPosts';
import { useEffect, useState } from 'react';
import FeedPost from '../../FeedPost';
import FeedPostLoader from '../../FeedPostLoader';

interface UserPostFetcherProps {
  userData: GetUserResponse;
  handle: string;
}

export default function UserPostFetcher({ userData, handle }: UserPostFetcherProps) {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState<GetUserPostsResponse[]>([]);

  const { data, error, loading } = useUserPosts(handle, { page });

  useEffect(() => {
    if (error || loading) return;
    if (data.length === 0) return setHasMore(false);
    setPosts((prev) => [...prev, ...data]);
  }, [data, error, loading]);

  const handleLoadMore = () => {
    if (error || !hasMore) return;
    setPage((prev) => prev + 1);
  };

  return (
    <>
      {posts.map((post) => (
        <FeedPost
          hasLiked={post.hasLiked}
          hasReposted={false}
          avatar={userData.avatarUrl}
          comments={post.commentCount}
          content={post.content}
          createdAt={new Date(post.createdAt).getTime()}
          handle={userData.handle}
          likes={post.likeCount}
          postId={post.id}
          username={userData.displayName}
          reposts={0}
          views={0}
          key={post.id}
        />
      ))}

      <FeedPostLoader onVisible={handleLoadMore} />
    </>
  );
}
