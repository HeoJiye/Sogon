import { useForm } from 'react-hook-form';

import { bioValidation, nicknameValidation } from './validate';

export interface ProfileFormSchema {
  profileImage: File[];
  nickname: string;
  bio: string;
}

export function useProfileForm() {
  const { register, handleSubmit, watch, formState } = useForm<ProfileFormSchema>();

  return {
    register: {
      profileImage: register('profileImage'),
      nickname: register('nickname', nicknameValidation),
      bio: register('bio', bioValidation),
    },
    curProfileImage: watch('profileImage'),
    formState,
    handleSubmit,
  };
}
