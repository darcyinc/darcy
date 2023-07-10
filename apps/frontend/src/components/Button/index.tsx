import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'blue' | 'white' | 'transparent';
  size: 'small' | 'large';
}

export default function Button({ variant, children, size, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'flex cursor-pointer items-center justify-center rounded-full text-lg font-bold hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70',
        variant === 'blue' && 'border-none bg-blue text-[#fff]',
        variant === 'white' && 'border-none bg-white text-blue',
        variant === 'transparent' && 'border border-grayBorder bg-transparent hover:bg-hoverEffect',
        size === 'small' ? 'p-2 text-sm' : 'p-2.5',
        props.className
      )}
      type="button"
    >
      {children}
    </button>
  );
}
