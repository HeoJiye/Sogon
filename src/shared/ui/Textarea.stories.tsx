import type { Meta, StoryObj } from '@storybook/react';

import Textarea from './Textarea';

const meta = {
  title: '공통 컴포넌트/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { id: 'textarea', label: '소개' },
};
