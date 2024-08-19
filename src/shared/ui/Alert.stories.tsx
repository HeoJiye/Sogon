import type { Meta, StoryObj } from '@storybook/react';

import Alert from './Alert';
import useAlertStore, { type AlertStore } from './Alert.store';

const meta = {
  title: '공통 컴포넌트/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockAlertStore = (initialState: Partial<AlertStore>) => {
  useAlertStore.setState(initialState);
};

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => {
      // 여기서 Zustand 스토어의 초기 상태를 설정합니다.
      mockAlertStore({
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
