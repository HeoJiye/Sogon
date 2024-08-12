import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

// eslint-disable-next-line no-empty-pattern
function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className='hover:bg-neutral-focus btn btn-neutral btn-animation min-w-120 rounded-lg pl-16 pr-16'
      type='button'
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
