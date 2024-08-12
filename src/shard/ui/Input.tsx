import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

// eslint-disable-next-line no-empty-pattern
function Input({ id, label, ...props }: InputProps) {
  return (
    <div className='flex-center flex text-13 text-neutral'>
      <label className='w-100 font-semibold' htmlFor={id}>
        {label}
      </label>
      <input id={id} className='input input-bordered h-30 w-250 text-14' {...props} />
    </div>
  );
}

export default Input;
