'use client';

import { Button, Input, LinkButton, Logo, Modal } from '@/shared/ui';

import { useSignupForm } from '../lib';

export interface SignupFormProps {}

function SignupForm({}: SignupFormProps) {
  const { register, formState, onSubmit } = useSignupForm();

  return (
    <Modal>
      <div className='flex-center flex flex-col gap-48'>
        <Logo />
        <div className='flex-center flex flex-col gap-16'>
          <form className='flex-center flex flex-col gap-36' onSubmit={onSubmit}>
            <div className='flex-center flex flex-col gap-8'>
              <Input
                id='email'
                label='이메일'
                type='text'
                {...register.email}
                error={formState.errors.email?.message}
              />
              <Input
                id='password'
                label='비밀번호'
                type='password'
                {...register.password}
                error={formState.errors.password?.message}
              />
              <Input
                id='passwordConfirm'
                label='비밀번호 확인'
                type='password'
                {...register.passwordConfirm}
                error={formState.errors.passwordConfirm?.message}
              />
            </div>
            <Button type='submit'>회원 가입</Button>
          </form>
          <LinkButton href='/login'>로그인하기</LinkButton>
        </div>
      </div>
    </Modal>
  );
}

export default SignupForm;
