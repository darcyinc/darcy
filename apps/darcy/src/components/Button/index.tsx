import clsx from 'clsx';

interface ButtonProps extends React.ComponentProps<'button'> {
  color: 'blue' | 'white';
  size: 'sm' | 'md' | 'lg';
}

export default function Button({ children, color = 'blue', size = 'md', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        'flex items-center justify-center rounded-full px-5 py-2 font-bold disabled:cursor-not-allowed',
        color === 'blue' && 'bg-blue text-white hover:bg-blue/80 disabled:bg-blue/50 disabled:text-white/50',
        color === 'white' && 'bg-white text-black hover:bg-gray-300 disabled:bg-gray-300 disabled:text-black/70',
        size === 'sm' && 'text-sm',
        size === 'md' && 'text-base',
        size === 'lg' && 'w-full p-5 text-xl',
        props.className
      )}
      type="button"
    >
      {children}
    </button>
  );
}
