'use client';

import { KeyboardEvent, MouseEvent, PropsWithChildren, useCallback } from 'react';

import isEnterOrClick from '@/utils/isEnterOrClick';

export default function ClickablePost({ children }: PropsWithChildren) {
  const handleClick = useCallback((event: KeyboardEvent | MouseEvent) => {
    event.preventDefault();

    // only trigger if the event target is the post itself or a article element (post content)
    if (event.target !== event.currentTarget && (event.target as HTMLElement).tagName !== 'ARTICLE') return;

    if (!isEnterOrClick(event)) return;

    console.log('clicked on post');
  }, []);

  return (
    <div
      className="flex w-full gap-2 overflow-hidden border-b border-b-grayBorder p-2 hover:bg-hoverEffect"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      {children}
    </div>
  );
}
