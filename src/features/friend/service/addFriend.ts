import { QuerySnapshot } from 'firebase-admin/firestore';

import { pushFriendNoti } from '@/entities/notification/service';
import { USER_RECORD } from '@/entities/user/model';
import { findPendingRequestSnapshot } from '@/features/friendRequest/service';
import { db } from '@/shard/lib/firebaseAdmin';
import { BadRequestError, ConflictError, ForbiddenError, NotFoundError } from '@/shard/model';

import { AddFriendResponseDTO, FRIEND_RECORD } from '../model';

function acceptFriendRequest(userId: string, friendId: string, requestSnapshot: QuerySnapshot) {
  return db.runTransaction(async (transaction) => {
    const userFriendsRef = db.collection(USER_RECORD).doc(userId).collection(FRIEND_RECORD).doc(friendId);
    const friendFriendsRef = db.collection(USER_RECORD).doc(friendId).collection(FRIEND_RECORD).doc(userId);

    const existingFriend = await transaction.get(userFriendsRef);
    if (existingFriend.exists) {
      throw new ConflictError('이미 친구 관계가 존재합니다.');
    }

    transaction.set(userFriendsRef, { createdAt: new Date() });
    transaction.set(friendFriendsRef, { createdAt: new Date() });

    requestSnapshot.docs.forEach((doc) => transaction.update(doc.ref, { status: 'accepted' }));
  });
}

export async function addFriend(userId: string, friendId: string): Promise<AddFriendResponseDTO> {
  if (userId === friendId) {
    throw new ForbiddenError('나 자신은 영원한 인생의 친구입니다. 😊');
  }

  if (!(await db.collection(USER_RECORD).doc(friendId).get()).exists) {
    throw new NotFoundError('찾을 수 없는 사용자입니다.');
  }

  const requestSnapshot = await findPendingRequestSnapshot(userId, friendId);

  if (requestSnapshot.empty) {
    throw new BadRequestError('상대방으로부터 친구 요청이 존재하지 않습니다.');
  }

  await acceptFriendRequest(userId, friendId, requestSnapshot);

  await pushFriendNoti(userId, friendId);
  await pushFriendNoti(friendId, userId);

  return { userId, friendId, createdAt: new Date() };
}
