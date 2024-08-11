import type { Meta, StoryObj } from '@storybook/react';

import Popover from './Popover';

const meta = {
  title: '공통 컴포넌트/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
