import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { LoginFormSchema } from '../lib';
import LoginForm from './LoginForm';

const meta = {
  title: '제출 양식/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    email: '',
    keepLogin: '',
    onSubmit: (formData: LoginFormSchema) => {
      action('로그인 폼 제출됨')(formData);
    },
  },
};

export const RememberEmail: Story = {
  args: {
    email: 'aaaa@cc.com',
    keepLogin: '',
    onSubmit: (formData: LoginFormSchema) => {
      action('로그인 폼 제출됨')(formData);
    },
  },
};
