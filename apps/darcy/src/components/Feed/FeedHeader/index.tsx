import clsx from 'clsx';
import { ComponentProps } from 'react';

export default function FeedHeader({ children, ...props }: ComponentProps<'div'>) {
  return (
    <div className={clsx('sticky top-0 w-full border-b border-b-grayBorder bg-black/60 backdrop-blur-md z-10', props.className)}>{children}</div>
  );
}
