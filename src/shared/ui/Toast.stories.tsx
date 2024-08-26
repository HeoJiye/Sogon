import type { Meta, StoryObj } from '@storybook/react';

import Toast from './Toast';
import useToastStore, { type ToastStore } from './Toast.store';

const meta = {
  title: '공통 컴포넌트/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockToastStore = (initialState: Partial<ToastStore>) => {
  useToastStore.setState(initialState);
};

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => {
      mockToastStore({
        nextId: 4,
        queue: [
          { id: 0, type: 'success', message: 'This is a success alert!', persistent: false },
          { id: 1, type: 'error', message: 'This is an error alert!', persistent: true },
          { id: 2, type: 'info', message: 'This is an info alert!', persistent: false },
          {
            id: 3,
            type: 'info',
            message: 'LongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLong Text',
            persistent: false,
          },
        ],
      });

      return <Story />;
    },
  ],
};
