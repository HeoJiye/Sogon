import { useForm } from 'react-hook-form';

import { emailValidation, passwordConfirmValidation, passwordValidation } from './validate';

export interface SignupFormSchema {
  email: string;
  password: string;
  passwordConfirm: string;
}

export function useSignupForm() {
  const { register, handleSubmit, watch, formState } = useForm<SignupFormSchema>();

  return {
    register: {
      email: register('email', emailValidation),
      password: register('password', passwordValidation),
      passwordConfirm: register('passwordConfirm', passwordConfirmValidation(watch('password'))),
    },
    handleSubmit,
    watch,
    formState,
  };
}
