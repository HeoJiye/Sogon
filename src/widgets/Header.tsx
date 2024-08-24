'use client';

import {
  ArrowRightStartOnRectangleIcon,
  BellIcon,
  HomeIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { getCurUID, logout } from '@/features/auth/api';
import { Logo } from '@/shared/ui';

export interface HeaderProps {}

function Header({}: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    if (await logout()) {
      router.push('/login');
    }
  };

  return (
    <header className='fixed z-50 flex h-55 w-full items-center justify-between bg-neutral p-24'>
      <Logo title={false} />
      <nav className='flex h-fit gap-20'>
        <Link href='/'>
          <HomeIcon className='h-28 w-28 cursor-pointer text-base-100' />
        </Link>
        <Link href={`/profile/${getCurUID()}`}>
          <UserCircleIcon className='h-28 w-28 cursor-pointer text-base-100' />
        </Link>
        <Link href='/friends'>
          <UsersIcon className='h-28 w-28 cursor-pointer text-base-100' />
        </Link>
      </nav>
      <div className='flex h-fit gap-20'>
        <BellIcon className='h-28 w-28 cursor-pointer text-base-100' />
        <ArrowRightStartOnRectangleIcon className='h-28 w-28 cursor-pointer text-base-100' onClick={handleLogout} />
      </div>
    </header>
  );
}

export default Header;
