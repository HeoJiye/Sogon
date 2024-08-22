import { Button, Input, Logo, Modal, ProfileImageInput, Textarea } from '@/shared/ui';

export interface ProfileFormProps {}

function ProfileForm({}: ProfileFormProps) {
  return (
    <Modal>
      <div className='flex-center flex flex-col gap-36'>
        <Logo />
        <ProfileImageInput image={[]} />
        <div className='flex-center flex flex-col gap-8'>
          <Input id='nickname' label='이름' type='text' />
          <Textarea id='bio' label='소개' />
        </div>
        <Button type='submit'>회원 가입</Button>
      </div>
    </Modal>
  );
}

export default ProfileForm;
