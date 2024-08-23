import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'default' | 'cancel';
  children: React.ReactNode;
}

function Button({ color = 'default', children, ...props }: ButtonProps) {
  return (
    <button
      className={cn('hover:bg-neutral-focus btn animate-btn min-w-120 rounded-lg pl-16 pr-16', {
        'btn-neutral': color === 'default',
      })}
      type='button'
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
