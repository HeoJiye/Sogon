import type { Meta, StoryObj } from '@storybook/react';

import SignupForm from './SignupForm';

const meta = {
  title: '제출 양식/SignupForm',
  component: SignupForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof SignupForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
