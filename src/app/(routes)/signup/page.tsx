'use client';

import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createProfile } from '@/entities/user/api';
import { ProfileFormSchema } from '@/entities/user/lib';
import { ProfileForm } from '@/entities/user/ui';
import { signup, signupCancel } from '@/features/auth/api';
import { AuthDTO } from '@/features/auth/model';
import { SignupForm } from '@/features/auth/ui';

export default function Signup() {
  const router = useRouter();
  const [signupInfo, setSignupInfo] = useState<AuthDTO | null>(null);

  const hideProfileForm = () => setSignupInfo(null);

  const signupFormSubmit = ({ email, password }: AuthDTO) => setSignupInfo({ email, password });

  const profileFormSubmit = async (formData: ProfileFormSchema) => {
    if (!signupInfo) return;

    const signupSuccess = await signup(signupInfo);
    if (!signupSuccess) {
      hideProfileForm();
      return;
    }

    const profileCreated = await createProfile(formData);
    if (profileCreated) {
      router.push('/');
    } else {
      await signupCancel();
    }
  };

  return (
    <>
      <SignupForm onSubmit={signupFormSubmit} />
      <div className={cn({ hidden: signupInfo === null })}>
        <ProfileForm onSubmit={profileFormSubmit} buttonLabel='회원 가입 완료' onCancel={hideProfileForm} />
      </div>
    </>
  );
}
