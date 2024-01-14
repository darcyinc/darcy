'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import { apiClient } from '@/api/client';
import Button from '@/components/Button';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Oval } from 'react-loader-spinner';

export default function FeedPostComposer() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const currentUser = useCurrentUser();
  const t = useTranslations('Feed.PostComposer');

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);

    // handle if the element gets smaller
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  }, []);

  const handlePublish = useCallback(() => {
    setLoading(true);

    apiClient.post('/post', { content }).then((response) => {
      if (response.status === 201) setContent('');

      // TODO: error handling
      setLoading(false);
    });
  }, [content]);

  return (
    currentUser.token && (
      <div className="hidden w-full gap-3 border-b border-b-grayBorder p-2 py-4 md:flex">
        <div className="h-10 w-10 flex-shrink-0">
          <img alt="Your profile" className="rounded-full" draggable={false} src={currentUser.avatarUrl} />
        </div>

        <div className="flex w-full flex-col gap-2">
          <textarea
            className="max-h-32 resize-none bg-transparent text-textPrimary placeholder-textSecondary outline-none"
            placeholder="O que está acontecendo?"
            value={content}
            onChange={handleChange}
          />

          <Button className="self-end gap-2" color="white" disabled={content.length === 0 || loading} size="sm" onClick={handlePublish}>
            <Oval visible={loading} height="20" width="20" color="#000" secondaryColor="#000" ariaLabel="oval-loading" strokeWidth={5} />
            <p>{t('publish')}</p>
          </Button>
        </div>
      </div>
    )
  );
}
