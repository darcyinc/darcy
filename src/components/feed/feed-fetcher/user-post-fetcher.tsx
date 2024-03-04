'use client';

import useUserPosts from '@/api/queries/useUserPosts';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { GetUserPostResponse, GetUserPostsResponse } from '@/types/api/post';
import { GetUserResponse } from '@/types/api/user';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';
import { toast } from 'sonner';
import FeedPostComposer from '../feed-post-composer';
import FeedPostLoader from '../feed-post-loader';
import FeedPost from '../post';
import SkeletonPost from '../post/skeleton-post';

interface UserPostFetcherProps {
  userData: GetUserResponse;
  initialPosts: GetUserPostsResponse;
}

export default function UserPostFetcher({ userData, initialPosts }: UserPostFetcherProps) {
  // we start getting posts from page 2 because initialPosts returns the posts of page 1
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();
  const t = useTranslations('PostFetcher');
  const { data, error, isError, fetchNextPage } = useUserPosts(userData.handle, { initialData: initialPosts });

  if (isError) {
    toast.error(t('errorFetching'), { description: error.message, duration: 5000 });

    return (
      <>
        <FeedPostComposer hideOnMobile />
        <SkeletonPost />
        <SkeletonPost />
        <SkeletonPost />
        <SkeletonPost />
      </>
    );
  }

  const updatePostData = (postId: string, newData: Partial<GetUserPostResponse>) => {
    if (!data) return;

    const newDataPages = data.pages.map((page) => {
      const index = page.findIndex((post) => post.id === postId);
      const post = page[index];
      if (!post) return page;

      return [...page.slice(0, index), { ...post, ...newData }, ...page.slice(index + 1)];
    });

    queryClient.setQueryData(['users', userData.handle, 'posts'], (data: { pageParams: number }) => ({
      pages: newDataPages,
      pageParams: data.pageParams
    }));
  };

  return (
    <>
      {currentUser.handle === userData.handle && (
        <FeedPostComposer queryKeys={['user', currentUser.handle, 'posts']} showProfilePicture={false} hideOnMobile />
      )}

      {data?.pages
        ? data.pages.map((pagePosts, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Fragment key={i}>
              {pagePosts.map((post) => (
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
                  verified={userData.verified}
                  mediaUrls={post.mediaUrls}
                  key={post.id}
                  updatePostData={updatePostData}
                />
              ))}
            </Fragment>
          ))
        : // Useful for SEO and better UX on JavaScript disabled browsers.
          initialPosts.map((post) => (
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
              verified={userData.verified}
              mediaUrls={post.mediaUrls}
              key={post.id}
              updatePostData={updatePostData}
            />
          ))}

      <FeedPostLoader onVisible={fetchNextPage} />
    </>
  );
}
