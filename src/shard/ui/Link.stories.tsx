import type { Meta, StoryObj } from '@storybook/react';

import Link from './Link';

const meta = {
  title: '공통 컴포넌트/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: '안녕하세유' },
};
