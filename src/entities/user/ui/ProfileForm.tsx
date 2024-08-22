import { Button, Input, Logo, Modal, ProfileImageInput, Textarea } from '@/shared/ui';

import { ProfileFormSchema, useProfileForm } from '../lib';

export interface ProfileFormProps {
  onSubmit: (formData: ProfileFormSchema) => void;
}

function ProfileForm({ onSubmit }: ProfileFormProps) {
  const { register, handleSubmit, curProfileImage, formState } = useProfileForm();

  return (
    <Modal>
      <form className='flex-center flex flex-col gap-36' onSubmit={handleSubmit(onSubmit)}>
        <Logo />
        <ProfileImageInput image={curProfileImage} {...register.profileImage} />
        <div className='flex-center flex flex-col gap-8'>
          <Input
            id='nickname'
            label='이름'
            type='text'
            error={formState.errors.nickname?.message}
            {...register.nickname}
          />
          <Textarea id='bio' label='소개' error={formState.errors.bio?.message} {...register.bio} />
        </div>
        <Button type='submit'>회원 가입</Button>
      </form>
    </Modal>
  );
}

export default ProfileForm;
