'use client';

import { apiClient } from '@/api/client';
import { GetPostResponse } from '@/app/api/post/[postId]/route';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import LoadingSpinner from '../loading-spinner';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface FeedPostComposerProps {
  showProfilePicture?: boolean;
  onPublish?: (data: GetPostResponse) => void;
}

export default function FeedPostComposer({ showProfilePicture = true, onPublish }: FeedPostComposerProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const currentUser = useCurrentUser();
  const t = useTranslations('Feed.PostComposer');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);

    // handle if the element gets smaller
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handlePublish = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    apiClient.post('/post', { content }).then((response) => {
      setLoading(false);

      if (response.status === 201) {
        setContent('');
        toast('Post created successfully!');
        onPublish?.(response.data);
        return;
      }

      toast.error('Could not create post.');
    });
  };

  return (
    currentUser.token && (
      <div className="hidden w-full gap-3 border-b border-b-border p-2 py-4 md:flex">
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
            {loading && <LoadingSpinner />}
            {t('publish')}
          </Button>
        </div>
      </div>
    )
  );
}
