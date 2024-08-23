import type { Meta, StoryObj } from '@storybook/react';

import ProfileForm from './ProfileForm';

const meta = {
  title: '제출 양식/ProfileForm',
  component: ProfileForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onSubmit: () => {}, onCancel: () => {} },
} satisfies Meta<typeof ProfileForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
