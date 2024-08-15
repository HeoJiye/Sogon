'use client';

import React from 'react';

import AlertItem from './Alert.item';
import useAlertStore from './Alert.store';

export interface AlertProps {}

function Alert({}: AlertProps) {
  const { queue, pop } = useAlertStore((state) => ({
    queue: state.queue,
    pop: state.pop,
  }));

  return (
    <div className='toast toast-end z-999 items-end'>
      {queue.map(({ id, type, message, persistent }) => (
        <AlertItem key={id} type={type} message={message} persistent={persistent} onClose={() => pop(id)} />
      ))}
    </div>
  );
}

export default Alert;
