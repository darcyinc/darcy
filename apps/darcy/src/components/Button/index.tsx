import clsx from 'clsx';
import LoadingSpinner from '../LoadingSpinner';

interface ButtonProps extends React.ComponentProps<'button'> {
  color: 'blue' | 'white';
  size: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const ButtonStyles: Record<ButtonProps['color'], string> = {
  blue: 'bg-blue text-white hover:bg-blue/80 disabled:bg-blue/50 disabled:text-white/50',
  white: 'bg-white text-black hover:bg-gray-300 disabled:bg-gray-300 disabled:text-black/70'
};

const ButtonSizes: Record<ButtonProps['size'], string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'w-full p-5 text-xl'
};

export default function Button({ children, color = 'blue', type = 'button', size = 'md', loading, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={clsx(
        'flex items-center justify-center rounded-full px-5 py-2 gap-2 font-bold disabled:cursor-not-allowed',
        ButtonStyles[color],
        ButtonSizes[size],
        props.className
      )}
      type={type}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  );
}
