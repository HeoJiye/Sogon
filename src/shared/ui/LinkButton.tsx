import cn from 'classnames';
import Link from 'next/link';
import { ButtonHTMLAttributes } from 'react';

export interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  href?: string;
  onClick?: () => void;
  skeleton?: boolean;
  children: React.ReactNode;
}

function LinkButton({ className, href, onClick, skeleton, children, ...props }: LinkButtonProps) {
  return (
    <button
      className={cn(
        'btn btn-link h-20 min-h-20 text-14 font-thin text-neutral',
        {
          'hover:scale-105': !skeleton,
        },
        { 'rouneded-full skeleton w-100 cursor-default': skeleton },
        className
      )}
      type='button'
      onClick={onClick}
      {...props}
    >
      {skeleton || (href ? <Link href={href}>{children}</Link> : children)}
    </button>
  );
}

export default LinkButton;
