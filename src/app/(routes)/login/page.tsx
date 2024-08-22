'use client';

import { getCookie } from 'cookies-next';

import { login } from '@/features/auth/api';
import { LoginFormSchema } from '@/features/auth/lib';
import { LoginForm } from '@/features/auth/ui';

export default function Login() {
  const onSubmit = async ({ email, password, rememberEmail, keepLogin }: LoginFormSchema) => {
    if (await login({ email, password }, { rememberEmail, keepLogin })) {
      window.location.href = '/';
    }
  };

  return <LoginForm onSubmit={onSubmit} email={getCookie('email')} keepLogin={getCookie('keepLogin')} />;
}
