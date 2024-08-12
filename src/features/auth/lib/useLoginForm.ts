import { useForm } from 'react-hook-form';

import { emailValidation, requiredValidation } from './validate';

export interface LoginFormSchema {
  email: string;
  password: string;
}

export function useLoginForm() {
  const { register, handleSubmit, watch, formState } = useForm<LoginFormSchema>();

  return {
    register: {
      email: register('email', emailValidation),
      password: register('password', requiredValidation),
    },
    handleSubmit,
    watch,
    formState,
  };
}
