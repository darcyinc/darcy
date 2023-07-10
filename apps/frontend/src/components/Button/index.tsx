import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'blue' | 'white';
  size: 'small' | 'large';
}

export default function Button({ variant, children, size, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'flex cursor-pointer appearance-none  items-center justify-center rounded-full border-none text-lg font-bold capitalize hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70',
        variant === 'blue' && 'bg-blue text-[#fff]',
        variant === 'white' && 'bg-white text-blue',
        size === 'small' ? 'p-2' : 'p-2.5',
        props.className
      )}
      type="button"
    >
      {children}
    </button>
  );
}
