import { PropsWithChildren } from 'react';

export default function Feed({ children }: PropsWithChildren) {
  return <div className="relative h-full overflow-y-scroll border-grayBorder sm:border-x">{children}</div>;
}
