'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import Button from '@/components/Button';

export default function FeedPostComposer() {
  const [content, setContent] = useState('');
  const t = useTranslations('Feed.PostComposer');

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);

    console.log(event.target.scrollHeight);

    // handle if the element gets smaller
    event.target.style.height = 'auto';

    event.target.style.height = `${event.target.scrollHeight}px`;
  }, []);

  return (
    <div className="hidden w-full gap-3 border-b border-b-grayBorder p-2 py-4 md:flex">
      <div className="h-10 w-10 flex-shrink-0">
        <img alt="Your profile" className="rounded-full" draggable={false} src={'https://picsum.photos/44/44.webp'} />
      </div>

      <div className="flex w-full flex-col gap-2">
        <textarea
          className="max-h-32 resize-none bg-transparent text-textPrimary placeholder-textSecondary outline-none"
          placeholder="O que está acontecendo?"
          onChange={handleChange}
        />

        <Button className="self-end" color="white" disabled={content.length === 0} size="sm">
          <p>{t('publish')}</p>
        </Button>
      </div>
    </div>
  );
}
