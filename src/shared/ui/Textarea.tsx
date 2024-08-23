import cn from 'classnames';
import { TextareaHTMLAttributes, forwardRef } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, label, error, ...props }: TextareaProps, ref) => (
    <div className='flex text-13 text-neutral'>
      <label
        className={cn('flex h-30 w-100 items-center font-semibold', {
          'text-red-500': error,
        })}
        htmlFor={id}
      >
        {label}
      </label>
      <div>
        <textarea
          id={id}
          ref={ref} // ref 전달
          className={cn('textarea textarea-bordered mb-4 h-120 w-250 resize-none text-14', {
            'textarea-error': error,
          })}
          {...props} // 나머지 props 전달
        />
        <div className={cn('text-10 text-red-500', { hidden: !error })}>⚠ {error}</div>
      </div>
    </div>
  )
);

Textarea.displayName = 'Textarea';

export default Textarea;
