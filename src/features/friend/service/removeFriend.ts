import { USER_RECORD } from '@/entities/user/model';
import { db } from '@/shard/lib/firebaseAdmin';
import { BadRequestError, ForbiddenError, NotFoundError } from '@/shard/model';

import { FRIEND_RECORD } from '../model';

export async function removeFriend(userId: string, friendId: string): Promise<void> {
  if (userId === friendId) {
    throw new ForbiddenError('본인을 친구에서 제거할 수 없습니다.');
  }

  if (!(await db.collection(USER_RECORD).doc(friendId).get()).exists) {
    throw new NotFoundError('찾을 수 없는 사용자입니다.');
  }

  const userFriendRef = db.collection(USER_RECORD).doc(userId).collection(FRIEND_RECORD).doc(friendId);
  const friendFriendRef = db.collection(USER_RECORD).doc(friendId).collection(FRIEND_RECORD).doc(userId);

  if (!(await userFriendRef.get()).exists) {
    throw new BadRequestError('해당 사용자는 친구가 아닙니다.');
  }

  await db.runTransaction(async (transaction) => {
    transaction.delete(userFriendRef);
    transaction.delete(friendFriendRef);
  });
}
