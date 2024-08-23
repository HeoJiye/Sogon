'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createProfile } from '@/entities/user/api';
import { ProfileFormSchema } from '@/entities/user/lib';
import { ProfileForm } from '@/entities/user/ui';
import { signup } from '@/features/auth/api';
import { AuthDTO } from '@/features/auth/model';
import { SignupForm } from '@/features/auth/ui';

export default function Signup() {
  const router = useRouter();
  const [signupInfo, setSignupInfo] = useState<AuthDTO | null>(null);

  const signupFormSubmit = ({ email, password }: AuthDTO) => setSignupInfo({ email, password });

  const profileFormSubmit = async (formData: ProfileFormSchema) => {
    if (!signupInfo) return;

    const signupSuccess = await signup(signupInfo);
    if (!signupSuccess) {
      setSignupInfo(null);
      return;
    }

    const profileCreated = await createProfile(formData);
    if (profileCreated) {
      router.push('/');
    } else {
      setSignupInfo(null);
    }
  };

  return (
    <>
      <SignupForm onSubmit={signupFormSubmit} />
      {signupInfo && <ProfileForm onSubmit={profileFormSubmit} buttonLabel='회원 가입 완료' />}
    </>
  );
}
