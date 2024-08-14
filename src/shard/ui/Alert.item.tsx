import { CheckIcon, InformationCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

import cn from 'classnames';
import { useEffect } from 'react';

interface AlertItemProps {
  type: 'error' | 'success' | 'info';
  message: string;
  persistent?: boolean;
  onClose: () => void;
}

function AlertItem({ type, message, persistent, onClose }: AlertItemProps) {
  useEffect(() => {
    if (!persistent) {
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  });

  return (
    <div
      className={cn('alert w-fit min-w-400 text-14', {
        'alert-error': type === 'error',
        'alert-success': type === 'success',
        'alert-info': type === 'info',
      })}
    >
      {type === 'error' && <XCircleIcon className='h-24 w-24' />}
      {type === 'success' && <CheckIcon className='h-24 w-24' />}
      {type === 'info' && <InformationCircleIcon className='h-24 w-24' />}
      <span className='ml-2'>{message}</span>
      {persistent && <XMarkIcon className='h-18 w-18 cursor-pointer' onClick={onClose} />}
    </div>
  );
}

export default AlertItem;
