import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  color?: 'default' | 'cancel' | 'disabled';
  size?: 's' | 'm';
  skeleton?: boolean;
  children: React.ReactNode;
}

function Button({ className, color = 'default', size = 'm', skeleton, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'btn rounded-lg',
        {
          'btn-neutral': color === 'default',
        },
        {
          'btn-disabled': color === 'disabled',
        },
        {
          'h-40 min-h-40 min-w-100 text-14': size === 's',
        },
        {
          'min-w-120 pl-16 pr-16 text-16': size === 'm',
        },
        {
          'hover:bg-neutral-focus animate-btn': !skeleton,
        },
        {
          'skeleton cursor-default border-none hover:skeleton': skeleton,
        },
        className
      )}
      type='button'
      {...props}
    >
      {skeleton || children}
    </button>
  );
}

export default Button;
