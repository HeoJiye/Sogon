import { USER_RECORD, UserSimpleDTO } from '@/entities/user/model';
import { db } from '@/shard/lib/firebaseAdmin';
import { NotFoundError } from '@/shard/model';

import { FRIEND_RECORD } from '../model';

async function getFriendIds(userId: string): Promise<string[]> {
  const friendsRef = db.collection(USER_RECORD).doc(userId).collection(FRIEND_RECORD);
  const snapshot = await friendsRef.get();
  return snapshot.docs.map((doc) => doc.id);
}

async function getMutualFriendIds(curUserId: string, userId: string): Promise<string[]> {
  if (curUserId === userId) {
    return getFriendIds(userId);
  }
  const curUserFriends = await getFriendIds(curUserId);
  const userFriends = await getFriendIds(userId);

  return curUserFriends.filter((friendId) => userFriends.includes(friendId));
}

export async function getFriends(curUserId: string, userId: string): Promise<UserSimpleDTO[]> {
  if (!(await db.collection(USER_RECORD).doc(userId).get()).exists) {
    throw new NotFoundError('찾을 수 없는 사용자입니다.');
  }

  const friends = await getMutualFriendIds(curUserId, userId);

  return Promise.all(
    friends.map(async (friendId) => {
      const doc = await db.collection(USER_RECORD).doc(friendId).get();
      const { nickname, profileImage } = doc.data() as UserSimpleDTO;

      return {
        userId: friendId,
        nickname,
        profileImage,
      };
    })
  );
}
