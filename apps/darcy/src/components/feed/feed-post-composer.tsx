'use client';

import { apiClient } from '@/api/client';
import { GetPostResponse } from '@/app/api/post/[postId]/route';
import Button from '@/components/button';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import toast from 'react-hot-toast';

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

  const handlePublish = () => {
    setLoading(true);

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
      <div className="hidden w-full gap-3 border-b border-b-grayBorder p-2 py-4 md:flex">
        {showProfilePicture && (
          <div className="h-10 w-10 flex-shrink-0">
            <img alt="Your profile" className="rounded-full" draggable={false} src={currentUser.avatarUrl} />
          </div>
        )}

        <div className="flex w-full flex-col gap-2">
          <textarea
            className="max-h-32 resize-none bg-transparent text-textPrimary placeholder-textSecondary outline-none"
            placeholder="O que está acontecendo?"
            value={content}
            onChange={handleChange}
          />

          <Button
            className="self-end gap-2"
            color="white"
            disabled={content.length === 0}
            size="sm"
            onClick={handlePublish}
            loading={loading}
          >
            <p>{t('publish')}</p>
          </Button>
        </div>
      </div>
    )
  );
}
