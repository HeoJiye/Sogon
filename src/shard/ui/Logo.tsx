import Image from 'next/image';

import IconPath from '@/../public/icon.png';

export interface LogoProps {}

function Logo({}: LogoProps) {
  return (
    <div className='flex-center flex gap-8 text-18 font-bold text-neutral'>
      <Image src={IconPath} alt='Logo' width={32} height={32} />
      소곤
    </div>
  );
}

export default Logo;
