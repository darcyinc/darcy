'use client';

import { GetPostResponse } from '@/app/api/post/[postId]/route';
import { GetUserPostsResponse } from '@/app/api/users/[handle]/posts/route';
import { GetUserResponse } from '@/app/api/users/[handle]/route';
import useUserPosts from '@/hooks/api/useUserPosts';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useEffect, useState } from 'react';
import FeedPostComposer from '../feed-post-composer';
import FeedPostLoader from '../feed-post-loader';
import FeedPost from '../post';

interface UserPostFetcherProps {
  userData: GetUserResponse;
  initialPosts: GetUserPostsResponse[];
}

export default function UserPostFetcher({ userData, initialPosts }: UserPostFetcherProps) {
  // we start getting posts from page 2 because initialPosts returns the posts of page 1
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState<GetUserPostsResponse[]>(initialPosts);

  const currentUser = useCurrentUser();
  const { data, error, loading } = useUserPosts(userData.handle, { page });

  useEffect(() => {
    if (!hasMore || error || loading) return;

    if (data.length === 0) {
      setHasMore(false);
      return;
    }

    setPosts((prev) => [...prev, ...data]);
  }, [data, error, hasMore, loading]);

  const updatePostData = (postId: string, newData: Partial<GetUserPostsResponse>) => {
    setPosts((prev) => {
      const index = prev.findIndex((post) => post.id === postId);
      const post = prev[index];

      return [...prev.slice(0, index), { ...post, ...newData }, ...prev.slice(index + 1)];
    });
  };

  const handleLoadMore = () => {
    if (!data.length || error || !hasMore) return;
    setPage((prev) => prev + 1);
  };

  return (
    <>
      {currentUser.handle === userData.handle && (
        <FeedPostComposer queryKeys={['userPosts', currentUser.handle]} showProfilePicture={false} />
      )}

      {posts.map((post) => (
        <FeedPost
          hasLiked={post.hasLiked}
          hasReposted={false}
          avatar={userData.avatarUrl}
          comments={post.commentCount}
          content={post.content}
          createdAt={post.createdAt}
          handle={userData.handle}
          likes={post.likeCount}
          postId={post.id}
          username={userData.displayName}
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
