import { Button, Input, Logo, Modal, ProfileImageInput, Textarea } from '@/shared/ui';

import { ProfileFormSchema, useProfileForm } from '../lib';

export interface ProfileFormProps {
  onSubmit: (formData: ProfileFormSchema) => void;
  onCancel: () => void;
  buttonLabel?: string;
}

function ProfileForm({ onSubmit, onCancel, buttonLabel = '제출' }: ProfileFormProps) {
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
        <div className='flex gap-24'>
          <Button type='button' color='cancel' onClick={onCancel}>
            취소
          </Button>
          <Button type='submit'>{buttonLabel}</Button>
        </div>
      </form>
    </Modal>
  );
}

export default ProfileForm;
