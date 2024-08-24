import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  color?: 'default' | 'cancel' | 'disabled';
  skeleton?: boolean;
  children: React.ReactNode;
}

function Button({ className, color = 'default', skeleton, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'btn min-w-120 rounded-lg pl-16 pr-16',
        {
          'btn-neutral': color === 'default',
        },
        {
          'btn-disabled': color === 'disabled',
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
