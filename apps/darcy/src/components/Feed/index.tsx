import { PropsWithChildren } from 'react';

export default function Feed({ children }: PropsWithChildren) {
  return <div className="h-full border-grayBorder sm:border-x">{children}</div>;
}
