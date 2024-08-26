'use client';

import React from 'react';

import ToastItem from './Toast.item';
import useToastStore from './Toast.store';

export interface ToastProps {}

function Toast({}: ToastProps) {
  const { queue, pop } = useToastStore((state) => ({
    queue: state.queue,
    pop: state.pop,
  }));

  return (
    <div className='toast toast-end z-999 items-end'>
      {queue.map(({ id, type, message, persistent }) => (
        <ToastItem key={id} type={type} message={message} persistent={persistent} onClose={() => pop(id)} />
      ))}
    </div>
  );
}

export default Toast;
