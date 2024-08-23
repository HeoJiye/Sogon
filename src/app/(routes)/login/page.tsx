'use client';

import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

import { getCurUID, login } from '@/features/auth/api';
import { LoginFormSchema } from '@/features/auth/lib';
import { LoginForm } from '@/features/auth/ui';

export default function Login() {
  const router = useRouter();

  const onSubmit = async ({ email, password, rememberEmail, keepLogin }: LoginFormSchema) => {
    if (await login({ email, password }, { rememberEmail, keepLogin })) {
      router.push(`/profile/${getCurUID()}`);
    }
  };

  return <LoginForm onSubmit={onSubmit} email={getCookie('email')} keepLogin={getCookie('keepLogin')} />;
}
