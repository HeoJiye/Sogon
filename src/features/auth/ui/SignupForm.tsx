import { Button, Input, LinkButton, Logo, Modal } from '@/shard/ui';

export interface SignupFormProps {}

function SignupForm({}: SignupFormProps) {
  return (
    <Modal>
      <div className='flex-center flex flex-col gap-48'>
        <Logo />
        <div className='flex-center flex flex-col gap-16'>
          <form className='flex-center flex flex-col gap-36'>
            <div className='flex-center flex flex-col gap-8'>
              <Input id='email' name='email' label='이메일' type='text' />
              <Input id='password' name='password' label='비밀번호' type='password' />
              <Input id='password comfirm' name='password comfirm' label='비밀번호 확인' type='password' />
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
