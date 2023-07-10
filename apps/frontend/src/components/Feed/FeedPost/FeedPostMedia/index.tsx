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
    <button className="mt-3 rounded-2xl" type="button" onClick={handleImageClick}>
      {media?.map((mediaItem) => {
        if (mediaItem.endsWith('png') || mediaItem.endsWith('jpg') || mediaItem.endsWith('jpeg') || mediaItem.endsWith('webp')) {
          return (
            <img
              alt="Post"
              className="h-full max-h-[512px] w-full rounded-2xl border border-grayBorder"
              decoding="async"
              height={250}
              key={mediaItem}
              loading="lazy"
              src={mediaItem}
              width={320}
            />
          );
        }

        return (
          <img
            alt="Post"
            className="h-full max-h-[512px] w-full rounded-2xl border border-grayBorder"
            decoding="async"
            height={250}
            key={mediaItem}
            loading="lazy"
            src="https://via.placeholder.com/250x320.webp"
            width={320}
          />
        );
      })}
    </button>
  );
}
