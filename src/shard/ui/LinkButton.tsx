import { ButtonHTMLAttributes } from 'react';

export interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children: React.ReactNode;
}

function LinkButton({ onClick, children, ...props }: LinkButtonProps) {
  return (
    <button
      className='btn btn-link h-20 min-h-20 text-14 font-thin text-neutral hover:scale-105'
      type='button'
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default LinkButton;
