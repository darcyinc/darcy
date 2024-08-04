'use client';

import useAddPostLike from '@/api/mutations/use-add-post-like';
import useRemovePostLike from '@/api/mutations/use-remove-post-like';
import usePostRepost from '@/api/mutations/use-repost-post';
import type { GetPostResponse } from '@/types/api/posts';
import clsx from 'clsx';
import { Heart, Repeat2, Reply } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PostProps {
  post: GetPostResponse;
}

interface SocialOptimistic {
  likeCount: number;
  repostsCount: number;
  hasLiked: boolean;
  hasReposted: boolean;
}

export default function PostSocial({ post }: PostProps) {
  const repostMutation = usePostRepost(post.id);
  const addLikeMutation = useAddPostLike(post.id);
  const removeLikeMutation = useRemovePostLike(post.id);

  const [socialOptimistic, setSocialOptimistic] = useState<SocialOptimistic>({
    likeCount: post.likes_count,
    repostsCount: post.reposts_count,
    hasLiked: post.has_liked,
    hasReposted: post.has_reposted
  });

  useEffect(() => {
    setSocialOptimistic({
      likeCount: post.likes_count,
      repostsCount: post.reposts_count,
      hasLiked: post.has_liked,
      hasReposted: post.has_reposted
    });
  }, [post]);

  const handleRepost = () => {
    if (socialOptimistic.hasReposted) {
      setSocialOptimistic((prev) => ({
        ...prev,
        repostsCount: socialOptimistic.repostsCount - 1,
        hasReposted: false
      }));

      repostMutation.trigger(
        {},
        {
          onError: () => {
            setSocialOptimistic((prev) => ({
              ...prev,
              repostsCount: socialOptimistic.repostsCount + 1,
              hasReposted: true
            }));
          }
        }
      );
    } else {
      setSocialOptimistic((prev) => ({
        ...prev,
        repostsCount: socialOptimistic.repostsCount + 1,
        hasReposted: true
      }));

      repostMutation.trigger(
        {},
        {
          onError: () => {
            setSocialOptimistic((prev) => ({
              ...prev,
              repostsCount: socialOptimistic.repostsCount - 1,
              hasReposted: false
            }));
          }
        }
      );
    }
  };

  const handleLike = () => {
    if (socialOptimistic.hasLiked) {
      setSocialOptimistic((prev) => ({
        ...prev,
        likeCount: socialOptimistic.likeCount - 1,
        hasLiked: false
      }));

      removeLikeMutation.trigger(null, {
        onError: () => {
          setSocialOptimistic((prev) => ({
            ...prev,
            likeCount: socialOptimistic.likeCount + 1,
            hasLiked: true
          }));
        }
      });
    } else {
      setSocialOptimistic((prev) => ({
        ...prev,
        likeCount: socialOptimistic.likeCount + 1,
        hasLiked: true
      }));

      addLikeMutation.trigger(null, {
        onError: () => {
          setSocialOptimistic((prev) => ({
            ...prev,
            likeCount: socialOptimistic.likeCount - 1,
            hasLiked: false
          }));
        }
      });
    }
  };

  return (
    <div className="flex justify-evenly mt-1">
      <button
        type="button"
        className={clsx('flex flex-nowrap items-center gap-x-1 transition-none', 'hover:text-comment focus-visible:text-comment')}
      >
        <Reply className="size-5 transition-none" />
        <span className="text-sm transition-none">{post.replies_count}</span>
      </button>

      <button
        type="button"
        className={clsx(
          'flex flex-nowrap items-center gap-x-1 transition-none',
          'data-[reposted="true"]:text-repost hover:text-repost focus-visible:text-repost'
        )}
        data-reposted={socialOptimistic.hasReposted}
        onClick={handleRepost}
      >
        <Repeat2 className="size-5 transition-none" />
        <span className="text-sm transition-none">{socialOptimistic.repostsCount}</span>
      </button>

      <button
        type="button"
        className={clsx(
          'flex flex-nowrap items-center gap-x-1 transition-none group',
          'data-[liked="true"]:text-like hover:text-like focus-visible:text-like'
        )}
        data-liked={socialOptimistic.hasLiked}
        onClick={handleLike}
      >
        <Heart className='size-4 transition-none group-data-[liked="true"]:fill-like' />
        <span className="text-sm transition-none">{socialOptimistic.likeCount}</span>
      </button>
    </div>
  );
}
