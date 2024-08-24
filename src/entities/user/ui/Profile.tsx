import cn from 'classnames';
import Image from 'next/image';

import { LinkButton } from '@/shared/ui';

import { useGetProfileQuery } from '../api';
import ProfileButton from './ProfileButton';

export interface ProfileProps {
  uid: string;
}

function Profile({ uid }: ProfileProps) {
  const { data: profileData } = useGetProfileQuery(uid);

  return (
    <div className='h-w-full relative bg-slate-200'>
      <div className='absolute h-210 w-full bg-slate-200' />
      <div className='absolute-x-center absolute mt-120 w-720'>
        <div className='flex h-180 gap-8'>
          {profileData ? (
            <Image
              className='mask mask-circle'
              src={profileData?.profileImage || 'https://placehold.co/180'}
              width={180}
              height={180}
              alt={`${profileData?.nickname}의 프로필 이미지`}
            />
          ) : (
            <div className='skeleton h-180 w-180 shrink-0 rounded-full' />
          )}
          <div className='relative mt-90 w-full p-24'>
            <div>
              <h1 className={cn('text-24 font-bold', { 'skeleton h-28 w-180 rounded-full': !profileData })}>
                {profileData?.nickname}
              </h1>
              <p className={cn('text-14 text-neutral-500', { 'skeleton mt-12 h-14 w-180 rounded-full': !profileData })}>
                {profileData?.bio}
              </p>
            </div>
            <ProfileButton status={profileData?.status} />
            {profileData?.status === 'self' && (
              <LinkButton className='absolute -top-36 right-36' skeleton={!profileData}>
                프로필 수정
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
