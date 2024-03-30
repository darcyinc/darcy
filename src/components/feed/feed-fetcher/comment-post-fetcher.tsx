'use client';

import usePostComments from '@/api/queries/usePostComments';
import type { GetUserPostResponse } from '@/types/api/post';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';
import { toast } from 'sonner';
import FeedPostLoader from '../feed-post-loader';
import FeedPost from '../post';
import SkeletonPost from '../post/skeleton-post';

interface CommentPostFetcherProps {
  postId: string;
}

export default function CommentPostFetcher({ postId }: CommentPostFetcherProps) {
  // TODO: don't use usePopularPosts for authenticated users
  const queryClient = useQueryClient();
  const t = useTranslations('PostFetcher');
  const { data, error, isError, isLoading, fetchNextPage } = usePostComments(postId);

  if (isLoading || isError) {
    if (isError) toast.error(t('errorFetching'), { description: error.message, duration: 5000 });

    return (
      <>
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

    queryClient.setQueryData(['post', postId, 'comments'], (data: { pageParams: number }) => ({
      pages: newDataPages,
      pageParams: data.pageParams
    }));
  };

  return (
    <>
      {data?.pages?.map((pagePosts, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: pages will always be in order
        <Fragment key={i}>
          {pagePosts.map((post) => (
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
              verified={post.author.verified}
              mediaUrls={post.mediaUrls}
              key={post.id}
              updatePostData={updatePostData}
            />
          ))}
        </Fragment>
      ))}

      <FeedPostLoader onVisible={fetchNextPage} />
    </>
  );
}
