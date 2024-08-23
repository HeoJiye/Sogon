import { CookieValueTypes } from 'cookies-next';
import { useForm } from 'react-hook-form';

import { emailValidation, requiredValidation } from './validate';

export interface LoginFormSchema {
  email: string;
  password: string;
  rememberEmail: boolean;
  keepLogin: boolean;
}

export function useLoginForm(email: CookieValueTypes, keepLogin: CookieValueTypes) {
  const { register, handleSubmit, watch, formState } = useForm<LoginFormSchema>({
    defaultValues: {
      email: email ?? '',
      password: '',
      rememberEmail: !!email,
      keepLogin: keepLogin === 'true',
    },
  });

  return {
    register: {
      email: register('email', emailValidation),
      password: register('password', requiredValidation),
      rememberEmail: register('rememberEmail'),
      keepLogin: register('keepLogin'),
    },
    watch,
    formState,
    handleSubmit,
  };
}
