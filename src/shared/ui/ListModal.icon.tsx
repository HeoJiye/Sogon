import { BellIcon, EnvelopeIcon, UsersIcon } from '@heroicons/react/24/outline';

export type IconType = 'friend' | 'notification' | 'request';

export function Icon({ icon }: { icon?: IconType }) {
  const style = 'h-20 w-20';

  switch (icon) {
    case 'friend':
      return <UsersIcon className={style} />;
    case 'notification':
      return <BellIcon className={style} />;
    case 'request':
      return <EnvelopeIcon className={style} />;
    default:
      return null;
  }
}
