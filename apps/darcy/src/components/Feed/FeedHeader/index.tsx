import clsx from 'clsx';
import { ComponentProps } from 'react';

export default function FeedHeader({ children, ...props }: ComponentProps<'div'>) {
  return <div className={clsx('border-b border-b-grayBorder text-xl font-bold', props.className)}>{children}</div>;
}
