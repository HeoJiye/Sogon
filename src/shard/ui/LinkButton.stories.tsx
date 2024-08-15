import type { Meta, StoryObj } from '@storybook/react';

import LinkButton from './LinkButton';

const meta = {
  title: '공통 컴포넌트/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: '안녕하세유' },
};
