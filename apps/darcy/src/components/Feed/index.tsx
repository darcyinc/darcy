import { PropsWithChildren } from 'react';

export default function Feed({ children }: PropsWithChildren) {
  return <div className="w-full max-w-xl border-r border-r-grayBorder">{children}</div>;
}
