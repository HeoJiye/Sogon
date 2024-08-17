import { db } from '@/shard/lib/firebaseAdmin';

import { USER_RECORD, User, UserSimpleDTO } from '../model';

export async function getSimpleUser(userId: string): Promise<UserSimpleDTO> {
  const UserRecord = db.collection(USER_RECORD).doc(userId);
  const userSnapshot = await UserRecord.get();
  const user = userSnapshot.data() as User;

  return {
    userId,
    nickname: user.nickname,
    profileImage: user.profileImage ?? null,
  };
}
