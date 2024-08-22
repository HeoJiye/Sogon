import type { Meta, StoryObj } from '@storybook/react';

import { useForm } from 'react-hook-form';

import ProfileImageInput from './ProfileImageInput';

const meta = {
  title: '공통 컴포넌트/ProfileImageInput',
  component: ProfileImageInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { image: [] },
} satisfies Meta<typeof ProfileImageInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { watch, register } = useForm<{ image: File[] }>();

    return (
      <form>
        <ProfileImageInput image={watch('image')} {...register('image')} />
      </form>
    );
  },
};

export const FileUploaded: Story = {
  render: () => {
    const fakeImage = new Blob([''], { type: 'image/png' });
    const fakeFile = new File([fakeImage], 'image.png', { type: 'image/png' });

    const { watch, register } = useForm<{ image: File[] }>({
      defaultValues: { image: [fakeFile] },
    });

    return (
      <form>
        <ProfileImageInput image={watch('image')} {...register('image')} />
      </form>
    );
  },
};
