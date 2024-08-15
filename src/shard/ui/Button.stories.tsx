import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta = {
  title: '공통 컴포넌트/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: '버튼' },
};

export const LongText: Story = {
  args: { children: '버튼버튼버튼버튼버튼버튼버튼버튼버튼' },
};
