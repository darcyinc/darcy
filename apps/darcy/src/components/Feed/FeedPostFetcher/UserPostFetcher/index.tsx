'use client';

import { GetPostResponse } from '@/app/api/post/[postId]/route';
import { GetUserPostsResponse } from '@/app/api/users/[handle]/posts/route';
import { GetUserResponse } from '@/app/api/users/[handle]/route';
import useUserPosts from '@/hooks/api/useUserPosts';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useEffect, useState } from 'react';
import FeedPost from '../../FeedPost';
import FeedPostComposer from '../../FeedPostComposer';
import FeedPostLoader from '../../FeedPostLoader';

interface UserPostFetcherProps {
  userData: GetUserResponse;
  handle: string;
}

export default function UserPostFetcher({ userData, handle }: UserPostFetcherProps) {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState<GetUserPostsResponse[]>([]);

  const currentUser = useCurrentUser();
  const { data, error, loading } = useUserPosts(handle, { page });

  useEffect(() => {
    if (error || loading) return;
    if (data.length === 0) return setHasMore(false);
    setPosts((prev) => [...prev, ...data]);
  }, [data, error, loading]);

  const updatePostData = (postId: string, newData: Partial<GetUserPostsResponse>) => {
    setPosts((prev) => {
      const index = prev.findIndex((post) => post.id === postId);
      const post = prev[index];

      return [...prev.slice(0, index), { ...post, ...newData }, ...prev.slice(index + 1)];
    });
  };

  const handleLoadMore = () => {
    if (error || !hasMore) return;
    setPage((prev) => prev + 1);
  };

  const onComposerPublish = (data: GetPostResponse) => {
    setPosts((prev) => [data, ...prev]);
  };

  return (
    <>
      {currentUser.handle === userData.handle && <FeedPostComposer onPublish={onComposerPublish} showProfilePicture={false} />}

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
          updatePostData={updatePostData}
        />
      ))}

      <FeedPostLoader onVisible={handleLoadMore} />
    </>
  );
}
