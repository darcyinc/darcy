import clsx from 'clsx';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  color: 'blue' | 'white';
  size: 'sm' | 'md' | 'lg';
}

export default function Button({ children, color = 'blue', size = 'md', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        'flex items-center justify-center rounded-full p-2 text-xl font-bold',
        color === 'blue' && 'bg-blue text-white hover:bg-blue/80',
        color === 'white' && 'bg-white text-black hover:bg-gray-300',
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
