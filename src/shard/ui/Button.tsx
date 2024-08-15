import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className='hover:bg-neutral-focus btn btn-neutral animate-btn min-w-120 rounded-lg pl-16 pr-16'
      type='button'
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
