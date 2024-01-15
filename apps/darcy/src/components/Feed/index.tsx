import { PropsWithChildren } from 'react';

import MobileNavbar from '../Navbar/MobileNavbar';

export default function Feed({ children }: PropsWithChildren) {
  return (
    <>
      <div className="relative h-full border-grayBorder sm:border-x">{children}</div>
      <MobileNavbar />
    </>
  );
}

export { default as FeedFilter } from './FeedFilter';
export { default as FeedHeader } from './FeedHeader';
export { default as FeedPost } from './FeedPost';
export { default as FeedPostComposer } from './FeedPostComposer';
export { default as FeedPostLoader } from './FeedPostLoader';
