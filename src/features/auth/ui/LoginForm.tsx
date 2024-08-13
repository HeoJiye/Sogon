'use client';

import { Button, CheckBox, Input, LinkButton, Logo, Modal } from '@/shard/ui';

import { useLoginForm } from '../lib';

export interface LoginFormProps {}

function LoginForm({}: LoginFormProps) {
  const { register, formState, onSubmit } = useLoginForm();

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
              <CheckBox id='rememberEmail' label='이메일 기억하기' {...register.rememberEmail} />
              <CheckBox id='keepLogin' label='로그인 유지하기' {...register.keepLogin} />
            </div>
            <Button type='submit'>로그인</Button>
          </form>
          <div className='flex-center flex flex-col gap-8'>
            <LinkButton href='/signup'>회원 가입하기</LinkButton>
            <LinkButton>테스트 계정으로 접속하기</LinkButton>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default LoginForm;
