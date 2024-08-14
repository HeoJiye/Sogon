import { useForm } from 'react-hook-form';

import { signup } from '../api/authAPI';
import { emailValidation, passwordConfirmValidation, passwordValidation } from './validate';

export interface SignupFormSchema {
  email: string;
  password: string;
  passwordConfirm: string;
}

export function useSignupForm() {
  const { register, handleSubmit, watch, formState } = useForm<SignupFormSchema>();

  const onSubmit = async ({ email, password }: SignupFormSchema) => {
    if (await signup({ email, password })) {
      window.location.href = '/';
    }
  };

  return {
    register: {
      email: register('email', emailValidation),
      password: register('password', passwordValidation),
      passwordConfirm: register('passwordConfirm', passwordConfirmValidation(watch('password'))),
    },
    handleSubmit,
    watch,
    formState,
    onSubmit: handleSubmit(onSubmit),
  };
}
