import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ProfileResponseDTO } from '../model';
import Profile, { ProfileProps } from './Profile';

const meta = {
  title: '프로필/Profile',
  component: Profile,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { uid: 'uid' },
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

const data: ProfileResponseDTO = {
  userId: 'uid',
  nickname: 'nickname',
  profileImage: 'https://placehold.co/180',
  bio: 'bio',
  status: 'self',
};

export const Default: Story = {
  render: ({ uid }: ProfileProps) => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity } } });
    queryClient.setQueryData(['profile', uid], data);

    return (
      <QueryClientProvider client={queryClient}>
        <Profile uid={uid} />
      </QueryClientProvider>
    );
  },
  args: {},
};

export const Skeleton: Story = {
  render: ({ uid }: ProfileProps) => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity } } });
    queryClient.setQueryData(['profile', uid], null);

    return (
      <QueryClientProvider client={queryClient}>
        <Profile uid={uid} />
      </QueryClientProvider>
    );
  },
  args: {},
};
