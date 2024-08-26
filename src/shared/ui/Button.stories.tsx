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

export const Cancel: Story = {
  args: { children: '버튼', color: 'cancel' },
};

export const Disabled: Story = {
  args: { children: '버튼', color: 'disabled' },
};

export const Small: Story = {
  args: { children: '버튼', size: 's' },
};

export const Medium: Story = {
  args: { children: '버튼', size: 'm' },
};

export const Skeleton: Story = {
  args: { children: '버튼', skeleton: true },
};
