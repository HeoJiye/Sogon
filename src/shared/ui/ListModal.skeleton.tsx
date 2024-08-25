import { XMarkIcon } from '@heroicons/react/16/solid';

import IconButton from './IconButton';
import { Icon, IconType } from './ListModal.icon';

export interface ListModalSkeletonProps {
  icon: IconType;
  title: string;
}

function ListModalSkeleton({ icon, title }: ListModalSkeletonProps) {
  return (
    <div className='modal modal-open !bg-transparent text-neutral'>
      <div className='modal-box relative flex h-360 w-400 animate-modal-show flex-col gap-12 border'>
        <div className='flex items-center justify-between pl-8 pr-8'>
          <div className='flex items-center gap-8 text-14 font-bold'>
            <Icon icon={icon} /> {title}
          </div>
          <IconButton icon={<XMarkIcon className='h-20 w-20 text-slate-500' />} />
        </div>
        <hr />
        <div className='flex flex-col gap-12'>
          <div className='skeleton ml-8 mr-8 h-36 rounded-md' />
          <div className='skeleton ml-8 mr-8 h-36 rounded-md' />
          <div className='skeleton ml-8 mr-8 h-36 rounded-md' />
        </div>
      </div>
    </div>
  );
}

export default ListModalSkeleton;
