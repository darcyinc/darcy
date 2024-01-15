'use client';

import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';

import { apiClient } from '@/api/client';
import { GetUserPostsResponse } from '@/app/api/users/[handle]/posts/route';
import { GetUserResponse } from '@/app/api/users/[handle]/route';
import Feed, { FeedPost, FeedPostComposer, FeedPostLoader } from '@/components/Feed';
import FeedHeader from '@/components/Feed/FeedHeader';
import UserProfile from '@/components/UserProfile';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useCallback, useEffect, useState } from 'react';

interface HomeProps {
  params: {
    username: string;
  };
}

export default function Home({ params }: HomeProps) {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState<GetUserResponse>();
  const [posts, setPosts] = useState<GetUserPostsResponse[]>([]);
  const currentUser = useCurrentUser();

  useEffect(() => {
    apiClient.get(`/users/${params.username}`).then((response) => {
      if (response.status !== 200) return setError(true);
      setUserData(response.data);
    });
  }, [params]);

  const handleLoadMore = useCallback(async () => {
    if (!hasMore) return;

    setPage((prev) => prev + 1);

    const response = await apiClient.get(`/users/${params.username}/posts?page=${page}`);
    setPosts((prev) => [...prev, ...response.data]);

    if (response.data.length === 0) setHasMore(false);
    return;
  }, [page, hasMore, params]);

  if (error) {
    return (
      <Feed>
        <FeedHeader className="flex items-center gap-4 p-2 backdrop-blur-md">
          <Link className="rounded-full text-textPrimary hover:bg-hoverEffect p-2" href="/">
            <MdArrowBack className="h-5 w-5" />
          </Link>
        </FeedHeader>

        <p className="text-center mt-2 text-xl">User not found.</p>
      </Feed>
    );
  }

  if (!userData) {
    return (
      <Feed>
        <FeedHeader className="flex items-center gap-4 p-2 backdrop-blur-md">
          <Link className="rounded-full text-textPrimary hover:bg-hoverEffect p-2" href="/">
            <MdArrowBack className="h-5 w-5" />
          </Link>
        </FeedHeader>
      </Feed>
    );
  }

  return (
    <Feed>
      <FeedHeader className="flex items-center gap-4 p-2 backdrop-blur-md">
        <Link className="rounded-full text-textPrimary hover:bg-hoverEffect p-2" href="/">
          <MdArrowBack className="h-5 w-5" />
        </Link>

        <div>
          <h1 className="text-lg font-bold text-textPrimary">{userData.displayName}</h1>
          <p className="text-sm text-textSecondary">{userData.postCount} posts</p>
        </div>
      </FeedHeader>

      <UserProfile {...userData} bannerUrl="https://picsum.photos/800/200" />

      {currentUser.handle === userData.handle && <FeedPostComposer showProfilePicture={false} />}

      {posts.map((post) => (
        <FeedPost
          hasLiked={false}
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
    </Feed>
  );
}
