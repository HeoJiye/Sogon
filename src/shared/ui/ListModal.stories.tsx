import type { Meta, StoryObj } from '@storybook/react';

import ListModal, { ListModalSkeleton } from './ListModal';

const meta = {
  title: '공통 컴포넌트/ListModal',
  component: ListModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ListModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotificationList: Story = {
  args: {
    icon: 'notification',
    title: '알림 목록',
    keys: ['key1', 'key2', 'key3'],
    contents: [
      <div>
        <div className='text-14 font-bold'>&apos;허지예&apos;님의 게시글이 올라왔어요!</div>
        <span className='text-12 text-slate-500'>규카츠 맛있다~!</span>
      </div>,
      <div>
        <div className='text-14 font-bold'>&apos;허지예&apos;님의 게시글이 올라왔어요!</div>
        <span className='text-12 text-slate-500'>규카츠 맛있다~!</span>
      </div>,
      <div>
        <div className='text-14 font-bold'>&apos;허지예&apos;님의 게시글이 올라왔어요!</div>
        <span className='text-12 text-slate-500'>규카츠 맛있다~!</span>
      </div>,
    ],
  },
};

export const NotificationListHeader: Story = {
  args: {
    icon: 'notification',
    title: '알림 목록',
    keys: ['key1', 'key2', 'key3'],
    contents: [
      <div>
        <div className='text-14 font-bold'>&apos;허지예&apos;님의 게시글이 올라왔어요!</div>
        <span className='text-12 text-slate-500'>규카츠 맛있다~!</span>
      </div>,
      <div>
        <div className='text-14 font-bold'>&apos;허지예&apos;님의 게시글이 올라왔어요!</div>
        <span className='text-12 text-slate-500'>규카츠 맛있다~!</span>
      </div>,
      <div>
        <div className='text-14 font-bold'>&apos;허지예&apos;님의 게시글이 올라왔어요!</div>
        <span className='text-12 text-slate-500'>규카츠 맛있다~!</span>
      </div>,
    ],
    position: 'header',
  },
};

export const NoContent: Story = {
  args: {
    icon: 'notification',
    title: '알림 목록',
    keys: [],
    contents: [],
  },
};

export const Skeleton: Story = {
  render: () => <ListModalSkeleton icon='notification' title='알림 목록' />,
  args: {
    icon: 'notification',
    title: '알림 목록',
    keys: [],
    contents: [],
  },
};
