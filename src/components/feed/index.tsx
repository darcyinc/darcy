import type { PropsWithChildren } from 'react';

import MobileNavbar from '../navbar/mobile-navbar';

export default function Feed({ children }: PropsWithChildren) {
  return (
    <>
      <div className="relative h-full border-border sm:border-x">{children}</div>
      <MobileNavbar />
    </>
  );
}

export { default as FeedFilter } from './feed-filter';
export { default as FeedHeader } from './feed-header';
export { default as FeedPost } from './post';
export { default as FeedPostComposer } from './feed-post-composer';
export { default as FeedPostLoader } from './feed-post-loader';
