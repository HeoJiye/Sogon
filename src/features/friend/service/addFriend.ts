import { QuerySnapshot, Timestamp } from 'firebase-admin/firestore';

import { pushFriendNoti } from '@/entities/notification/service';
import { USER_RECORD } from '@/entities/user/model';
import { FriendRequest } from '@/features/friendRequest/model';
import { findPendingRequestSnapshot } from '@/features/friendRequest/service';
import { db } from '@/shared/lib/firebaseAdmin';
import { BadRequestError, ConflictError, ForbiddenError, NotFoundError } from '@/shared/model';

import { AddFriendResponseDTO, FRIEND_RECORD, Friend } from '../model';

async function acceptFriendRequest(userId: string, friendId: string, requestSnapshot: QuerySnapshot) {
  const date = new Date();
  const timestamp = Timestamp.fromDate(date);

  await db.runTransaction(async (transaction) => {
    const userFriendsRef = db.collection(USER_RECORD).doc(userId).collection(FRIEND_RECORD).doc(friendId);
    const friendFriendsRef = db.collection(USER_RECORD).doc(friendId).collection(FRIEND_RECORD).doc(userId);

    const existingFriend = await transaction.get(userFriendsRef);
    if (existingFriend.exists) {
      throw new ConflictError('이미 친구 관계가 존재합니다.');
    }

    transaction.set(userFriendsRef, {
      createdAt: timestamp,
    } satisfies Friend);

    transaction.set(friendFriendsRef, {
      createdAt: timestamp,
    } satisfies Friend);

    requestSnapshot.docs.forEach((doc) =>
      transaction.update(doc.ref, { status: 'accepted' } satisfies Partial<FriendRequest>)
    );
  });

  return date;
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

  const createdAt = await acceptFriendRequest(userId, friendId, requestSnapshot);

  await pushFriendNoti(userId, friendId);
  await pushFriendNoti(friendId, userId);

  return { userId, friendId, createdAt };
}
