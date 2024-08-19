import Link from 'next/link';
import { ButtonHTMLAttributes } from 'react';

export interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

function LinkButton({ href, onClick, children, ...props }: LinkButtonProps) {
  return (
    <button
      className='btn btn-link h-20 min-h-20 text-14 font-thin text-neutral hover:scale-105'
      type='button'
      onClick={onClick}
      {...props}
    >
      {href ? <Link href={href}>{children}</Link> : children}
    </button>
  );
}

export default LinkButton;
