import { PropsWithChildren } from 'react';

export default function Feed({ children }: PropsWithChildren) {
  return <div className="h-full w-full max-w-[600px] border-grayBorder sm:border-l sm:border-r">{children}</div>;
}
