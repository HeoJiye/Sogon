import type { Meta, StoryObj } from '@storybook/react';

import Header from './Header';

const meta = {
  title: 'Component/Header',
  component: Header,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/profile',
        query: {
          user: '1',
        },
      },
    },
  },
};
