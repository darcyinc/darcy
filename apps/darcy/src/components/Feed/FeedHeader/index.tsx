import { PropsWithChildren } from 'react';

export default function FeedHeader({ children }: PropsWithChildren) {
  return <div className="border-b border-b-grayBorder p-4 text-xl font-bold">{children}</div>;
}
