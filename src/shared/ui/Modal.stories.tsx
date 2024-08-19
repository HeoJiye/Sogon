import type { Meta, StoryObj } from '@storybook/react';

import Modal from './Modal';

const meta = {
  title: '공통 컴포넌트/Modal',
  component: Modal,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: <div>안녕하세유</div> },
};
