import { CheckIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

import cn from 'classnames';
import { useEffect, useState } from 'react';

interface AlertItemProps {
  type: 'error' | 'success' | 'info';
  message: string;
  persistent?: boolean;
  onClose: () => void;
}

function AlertItem({ type, message, persistent, onClose }: AlertItemProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    if (!persistent) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 500);
      }, 3000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [persistent, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500);
  };

  return (
    <div
      className={cn('alert w-fit min-w-400 transform transition-all ease-in-out', {
        'alert-error': type === 'error',
        'alert-success': type === 'success',
        'alert-info': type === 'info',
        'translate-y-20 rotate-12 scale-75 opacity-0 duration-500': !isVisible,
        'translate-y-0 rotate-0 scale-110 opacity-100 duration-700': isVisible,
      })}
    >
      {type === 'error' && <XCircleIcon className='h-24 w-24' />}
      {type === 'success' && <CheckIcon className='h-24 w-24' />}
      {type === 'info' && <InformationCircleIcon className='h-24 w-24' />}
      <span className='ml-2'>{message}</span>
      {persistent && (
        <button className='btn btn-ghost btn-sm ml-4' type='button' onClick={handleClose}>
          확인
        </button>
      )}
    </div>
  );
}

export default AlertItem;
