import clsx from 'clsx';
import { ComponentProps } from 'react';

export default function FeedHeader({ children, ...props }: ComponentProps<'div'>) {
  return <div className={clsx('w-full border-b border-b-grayBorder', props.className)}>{children}</div>;
}
