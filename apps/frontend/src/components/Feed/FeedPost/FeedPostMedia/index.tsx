'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import isEnterOrClick, { EnterOrClickEvent } from '@/lib/utils/isEnterOrClick';

interface FeedPostMediaProps {
  media: string[];
}

export default function FeedPostMedia({ media }: FeedPostMediaProps) {
  const router = useRouter();

  const handleImageClick = useCallback(
    (e: EnterOrClickEvent<HTMLButtonElement>) => {
      if (!isEnterOrClick(e)) return;
      e.stopPropagation();

      router.push('/post/9041203120312');
    },
    [router]
  );

  return (
    <div>
      <div className="grid grid-cols-2 gap-0.5">
        {media.map((mediaItem) => (
          <button
            className="overflow-hidden rounded-md"
            key={mediaItem}
            type="button"
            onClick={handleImageClick}
            onKeyDown={handleImageClick}
          >
            {mediaItem.endsWith('png') || mediaItem.endsWith('jpg') || mediaItem.endsWith('jpeg') || mediaItem.endsWith('webp') ? (
              <img alt="test" src={mediaItem} />
            ) : (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video src={mediaItem} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
