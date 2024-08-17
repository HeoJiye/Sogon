import { USER_RECORD, UserSimpleDTO } from '@/entities/user/model';
import { getSimpleUser } from '@/entities/user/service';
import { db } from '@/shard/lib/firebaseAdmin';
import { NotFoundError } from '@/shard/model';

import { FRIEND_RECORD } from '../model';

export async function getFriendIds(userId: string): Promise<string[]> {
  const friendsRef = db.collection(USER_RECORD).doc(userId).collection(FRIEND_RECORD);
  const snapshot = await friendsRef.get();
  return snapshot.docs.map((doc) => doc.id);
}

async function getMutualFriendIds(curUserId: string, userId: string): Promise<string[]> {
  if (curUserId === userId) {
    return getFriendIds(userId);
  }
  const curUserFriends = await getFriendIds(curUserId);

  const snapshot = await db
    .collection(USER_RECORD)
    .doc(userId)
    .collection(FRIEND_RECORD)
    .where('__name__', 'in', curUserFriends)
    .get();

  return snapshot.docs.map((doc) => doc.id);
}

export async function getFriends(curUserId: string, userId: string): Promise<UserSimpleDTO[]> {
  if (!(await db.collection(USER_RECORD).doc(userId).get()).exists) {
    throw new NotFoundError('찾을 수 없는 사용자입니다.');
  }

  return Promise.all((await getMutualFriendIds(curUserId, userId)).map(getSimpleUser));
}
