import type { Meta, StoryObj } from '@storybook/react';

import [FTName] from './[FTName]';

const meta = {
  title: 'Component/[FTName]',
  component: [FTName],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof [FTName]>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
