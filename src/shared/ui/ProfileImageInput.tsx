'use client';

import { CameraIcon } from '@heroicons/react/24/outline';

import Image from 'next/image';
import { InputHTMLAttributes, forwardRef, useEffect, useState } from 'react';

export interface ProfileImageInputProps extends InputHTMLAttributes<HTMLInputElement> {
  image: File[];
}

const ProfileImageInput = forwardRef<HTMLInputElement, ProfileImageInputProps>(
  ({ id, image, ...props }: ProfileImageInputProps, ref) => {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
      if (image && image.length > 0) {
        const file = image[0];
        setPreview(URL.createObjectURL(file));
      }
    }, [image]);

    return (
      <div className='flex flex-col items-center justify-center'>
        <div className='relative flex h-120 w-120 items-center justify-center overflow-hidden rounded-full'>
          {preview && <Image className='absolute object-cover' src={preview} alt='Preview' width='120' height='120' />}
          <label
            htmlFor={id}
            className='h-w-full absolute flex cursor-pointer items-center justify-center bg-black text-white opacity-50'
          >
            <CameraIcon className='h-36 w-36' />
            <input id={id} ref={ref} type='file' className='hidden' {...props} />
          </label>
        </div>
      </div>
    );
  }
);

ProfileImageInput.displayName = 'ProfileImageInput';

export default ProfileImageInput;
