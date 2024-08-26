import toast from '@/shared/lib/toast';
import { Button } from '@/shared/ui';

import { UserReleationStatus } from '../model';

export interface ProfileButtonProps {
  status?: UserReleationStatus;
}

function ProfileButton({ status }: ProfileButtonProps) {
  const style = 'absolute right-24 top-24';

  if (!status) {
    return (
      <Button className={style} skeleton>
        {' '}
      </Button>
    );
  }

  if (status === 'self') {
    const handleClick = async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({ type: 'info', message: '프로필 링크가 클립보드에 복사되었습니다.' });
      } catch (err) {
        toast({ type: 'error', message: '프로필 링크 복사가 실패했어요.' });
      }
    };

    return (
      <Button className={style} onClick={handleClick}>
        친구 초대
      </Button>
    );
  }

  if (status === 'none') {
    return <Button className={style}>친구 신청</Button>;
  }

  if (status === 'pending') {
    return (
      <Button className={style} color='disabled' disabled>
        친구 요청 대기중
      </Button>
    );
  }

  return null;
}

export default ProfileButton;
