'use client';

import useCreatePost from '@/api/mutations/useCreatePost';
import { GetPostResponse } from '@/app/api/post/[postId]/route';
import { GetUserPostsResponse } from '@/app/api/users/[handle]/posts/route';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import LoadingSpinner from '../loading-spinner';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface FeedPostComposerProps {
  showProfilePicture?: boolean;
  queryKeys?: unknown[];
  hideBorder?: boolean;
  hideOnMobile?: boolean;
}

export default function FeedPostComposer({ showProfilePicture = true, hideBorder, hideOnMobile, queryKeys }: FeedPostComposerProps) {
  const mutation = useCreatePost();
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();
  const t = useTranslations('Feed.PostComposer');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);

    // handle if the element gets smaller
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const updateQueryData = (newPost: GetPostResponse) => {
    if (!queryKeys) return;

    const data = queryClient.getQueryData<{ pages: GetUserPostsResponse[][] }>(queryKeys);
    if (!data) return;

    const newData = structuredClone(data.pages);
    newData[0] = [newPost, ...newData[0]];

    queryClient.setQueryData(queryKeys, (data: { pageParams: number }) => ({
      pages: newData,
      pageParams: data.pageParams
    }));
  };

  const handlePublish = () => {
    const publishStatusToast = toast.info(t('publishing'));

    mutation.mutate(
      { content },
      {
        onSettled: () => toast.dismiss(publishStatusToast),
        onError: () => toast.error(t('errorPublishing')),
        onSuccess: (data) => {
          setContent('');
          updateQueryData(data);
          toast(t('published'));
        }
      }
    );
  };

  return (
    currentUser.handle && (
      <div className={cn('flex w-full gap-3 p-2 py-4', !hideBorder && 'border-b border-b-border', hideOnMobile && 'hidden md:flex')}>
        {showProfilePicture && (
          <div className="h-10 w-10 flex-shrink-0">
            <Avatar>
              <AvatarImage src={currentUser.avatarUrl} alt="Your profile picture" />
              {/* TODO */}
              <AvatarFallback>??</AvatarFallback>
            </Avatar>
          </div>
        )}

        <div className="flex w-full flex-col gap-2">
          <Textarea
            className="max-h-32 border-transparent focus-visible:border-input rounded-xl text-base"
            placeholder="O que está acontecendo?"
            value={content}
            onChange={handleChange}
          />

          <Button
            variant="secondary"
            className="gap-2 rounded-full w-fit self-end font-bold"
            size="md"
            onClick={handlePublish}
            disabled={content.length === 0}
          >
            {mutation.isPending && <LoadingSpinner />}
            {t('publish')}
          </Button>
        </div>
      </div>
    )
  );
}
