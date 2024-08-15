import { getCookie } from 'cookies-next';
import { useForm } from 'react-hook-form';

import { login } from '../api/authAPI';
import { emailValidation, requiredValidation } from './validate';

export interface LoginFormSchema {
  email: string;
  password: string;
  rememberEmail: boolean;
  keepLogin: boolean;
}

export function useLoginForm() {
  const { register, handleSubmit, watch, formState } = useForm<LoginFormSchema>({
    defaultValues: {
      email: getCookie('email') ?? '',
      password: '',
      rememberEmail: getCookie('rememberEmail') === 'true',
      keepLogin: getCookie('keepLogin') === 'true',
    },
  });

  const onSubmit = async ({ email, password, rememberEmail, keepLogin }: LoginFormSchema) => {
    if (await login({ email, password }, { rememberEmail, keepLogin })) {
      window.location.href = '/';
    }
  };

  return {
    register: {
      email: register('email', emailValidation),
      password: register('password', requiredValidation),
      rememberEmail: register('rememberEmail'),
      keepLogin: register('keepLogin'),
    },
    watch,
    formState,
    onSubmit: handleSubmit(onSubmit),
  };
}
