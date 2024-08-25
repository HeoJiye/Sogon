import { XMarkIcon } from '@heroicons/react/16/solid';
import type { Meta, StoryObj } from '@storybook/react';

import IconButton from './IconButton';

const meta = {
  title: '공통 컴포넌트/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { icon: <XMarkIcon className='h-18 w-18' /> },
};
