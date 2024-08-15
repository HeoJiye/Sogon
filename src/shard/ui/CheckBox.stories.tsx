import type { Meta, StoryObj } from '@storybook/react';

import CheckBox from './CheckBox';

const meta = {
  title: '공통 컴포넌트/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { id: 'id', label: '체크박스 테스트' },
};
