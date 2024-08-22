'use client';

import { signup } from '@/features/auth/api';
import { SignupFormSchema } from '@/features/auth/lib';
import { SignupForm } from '@/features/auth/ui';

export default function Signup() {
  const onSubmit = async ({ email, password }: SignupFormSchema) => {
    if (await signup({ email, password })) {
      window.location.href = '/';
    }
  };
  return <SignupForm onSubmit={onSubmit} />;
}
