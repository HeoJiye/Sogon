import cn from 'classnames';
import { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}
const Input = forwardRef<HTMLInputElement, InputProps>(({ id, label, error, ...props }: InputProps, ref) => (
  <div className='flex text-13 text-neutral'>
    <label className={cn('h-30 w-100 font-semibold', { 'text-red-500': error })} htmlFor={id}>
      {label}
    </label>
    <div>
      <input
        id={id}
        ref={ref} // ref 전달
        className={cn('input input-bordered mb-4 h-30 w-250 text-14', { 'input-error': error })}
        {...props} // 나머지 props 전달
      />
      {error && <div className='text-10 text-red-500'>⚠ {error}</div>}
    </div>
  </div>
));

Input.displayName = 'Input';

export default Input;
