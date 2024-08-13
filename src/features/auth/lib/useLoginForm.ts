import { useForm } from 'react-hook-form';

import { login } from '../api/authAPI';
import { emailValidation, requiredValidation } from './validate';

export interface LoginFormSchema {
  email: string;
  password: string;
}

export function useLoginForm() {
  const { register, handleSubmit, watch, formState } = useForm<LoginFormSchema>();

  const onSubmit = async ({ email, password }: LoginFormSchema) => {
    await login({ email, password });
  };

  return {
    register: {
      email: register('email', emailValidation),
      password: register('password', requiredValidation),
    },
    watch,
    formState,
    onSubmit: handleSubmit(onSubmit),
  };
}
