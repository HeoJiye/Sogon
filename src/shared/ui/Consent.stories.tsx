import type { Meta, StoryObj } from '@storybook/react';

import Consent from './Consent';
import useConsentStore, { ConsentStore } from './Consent.store';

const meta = {
  title: '공통 컴포넌트/Consent',
  component: Consent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Consent>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockConsentStore = (initialState: Partial<ConsentStore>) => {
  useConsentStore.setState(initialState);
};

export const Default: Story = {
  decorators: [
    (Story) => {
      mockConsentStore({
        data: {
          content: '"허지예"님에게 친구 신청을 할까요?',
          onConfirm: () => {},
          onCancel: () => {},
        },
      });

      return <Story />;
    },
  ],
  args: {},
};
