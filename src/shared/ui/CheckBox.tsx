import { InputHTMLAttributes, forwardRef } from 'react';

export interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ id, label, defaultChecked, ...props }: CheckBoxProps, ref) => (
    <div className='form-control h-16 w-full'>
      <label className='label flex cursor-pointer justify-start gap-8' htmlFor={id}>
        <input
          id={id}
          ref={ref}
          className='checkbox checkbox-xs'
          type='checkbox'
          defaultChecked={defaultChecked}
          {...props}
        />
        <span className='label-text text-12'>{label}</span>
      </label>
    </div>
  )
);

export default CheckBox;
