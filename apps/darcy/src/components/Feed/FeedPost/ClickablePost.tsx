'use client';

import { useRouter } from 'next/navigation';
import { KeyboardEvent, MouseEvent, PropsWithChildren } from 'react';

import isEnterOrClick from '@/utils/isEnterOrClick';

interface ClickablePostProps {
  postId: string;
}

export default function ClickablePost({ children, postId }: PropsWithChildren<ClickablePostProps>) {
  const router = useRouter();

  const handleClick = (event: KeyboardEvent | MouseEvent) => {
    event.preventDefault();

    // only trigger if the event target is the post itself or a article element (post content)
    if (event.target !== event.currentTarget && (event.target as HTMLElement).tagName !== 'ARTICLE') return;

    if (!isEnterOrClick(event)) return;

    router.push(`/post/${postId}`);
  };

  return (
    <div
      className="overflow-hidden border-b border-b-grayBorder p-2 hover:bg-hoverEffect"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      {children}
    </div>
  );
}
