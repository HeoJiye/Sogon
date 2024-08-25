import { XMarkIcon } from '@heroicons/react/16/solid';
import { InboxStackIcon } from '@heroicons/react/24/outline';

import cn from 'classnames';

import IconButton from './IconButton';
import { Icon, IconType } from './ListModal.icon';

export { default as ListModalSkeleton } from './ListModal.skeleton';

export interface ListModalProps {
  icon: IconType;
  title: string;
  keys: string[];
  contents: React.ReactNode[];
  position?: 'center' | 'header';
  onClose?: () => void;
}

function ListModal({ icon, title, keys, contents, position = 'center', onClose }: ListModalProps) {
  return (
    <div
      className={cn('modal modal-open !bg-transparent text-neutral', {
        'items-start justify-end': position === 'header',
      })}
    >
      <div
        className={cn('modal-box relative flex max-h-500 w-400 animate-modal-show flex-col gap-12 border', {
          'right-36 top-64': position === 'header',
        })}
      >
        <div className='flex items-center justify-between pl-8 pr-8'>
          <div className='flex items-center gap-8 text-14 font-bold'>
            <Icon icon={icon} /> {title} ({contents.length})
          </div>
          <IconButton icon={<XMarkIcon className='h-20 w-20 text-slate-500' />} onClick={onClose} />
        </div>
        <hr />
        <div className='flex flex-col gap-4'>
          {contents.length > 0 ? (
            contents.map((content, idx) => (
              <div key={keys[idx]} className='cursor-pointer rounded-md p-8 pl-12 pr-12 hover:bg-base-200'>
                {content}
              </div>
            ))
          ) : (
            <div className='flex h-200 flex-col items-center justify-center gap-18 text-14 text-slate-500'>
              <InboxStackIcon className='h-36 w-36 text-slate-500' />
              보여드릴 게 없네요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListModal;
