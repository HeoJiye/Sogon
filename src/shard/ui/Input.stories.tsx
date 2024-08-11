import type { Meta, StoryObj } from '@storybook/react';

import Input from './Input';

const meta = {
  title: '공통 컴포넌트/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
