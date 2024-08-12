import { Button, Input, LinkButton, Logo, Modal } from '@/shard/ui';

export interface LoginFormProps {}

function LoginForm({}: LoginFormProps) {
  return (
    <Modal>
      <div className='flex-center flex flex-col gap-48'>
        <Logo />
        <div className='flex-center flex flex-col gap-16'>
          <form className='flex-center flex flex-col gap-36'>
            <div className='flex-center flex flex-col gap-8'>
              <Input id='email' name='email' label='이메일' type='text' />
              <Input id='password' name='password' label='비밀번호' type='password' />
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
