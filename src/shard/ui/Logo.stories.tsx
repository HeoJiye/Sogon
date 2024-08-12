import type { Meta, StoryObj } from '@storybook/react';

import Logo from './Logo';

const meta = {
  title: '공통 컴포넌트/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
