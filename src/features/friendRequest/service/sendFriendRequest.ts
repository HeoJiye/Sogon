import { Timestamp } from 'firebase-admin/firestore';

import { pushFriendRequestNoti } from '@/entities/notification/service';
import { USER_RECORD } from '@/entities/user/model';
import { db } from '@/shared/lib/firebaseAdmin';
import { ConflictError, ForbiddenError, NotFoundError } from '@/shared/model';

import { FRIEND_REQUEST_RECORD, FriendRequest, SendFriendResponseDTO } from '../model';

function getPendingRequests(senderId: string, receiverId: string) {
  return db
    .collection(USER_RECORD)
    .doc(receiverId)
    .collection(FRIEND_REQUEST_RECORD)
    .where('senderId', '==', senderId)
    .where('status', '==', 'pending')
    .get();
}

async function isRequestExists(senderId: string, receiverId: string): Promise<boolean> {
  const existingRequests = await Promise.all([
    getPendingRequests(senderId, receiverId),
    getPendingRequests(receiverId, senderId),
  ]);

  return existingRequests.every((requests) => requests.empty);
}

export async function sendFriendRequest(
  senderId: string,
  receiverId: string,
  message?: string
): Promise<SendFriendResponseDTO> {
  if (senderId === receiverId) {
    throw new ForbiddenError('나 자신은 영원한 인생의 친구입니다. 😊');
  }

  if (!(await db.collection(USER_RECORD).doc(receiverId).get()).exists) {
    throw new NotFoundError('해당 사용자를 찾을 수 없습니다.');
  }

  if (await isRequestExists(senderId, receiverId)) {
    throw new ConflictError('이미 친구 요청을 보냈거나, 받았습니다.');
  }

  const friendRequestRef = await db
    .collection(USER_RECORD)
    .doc(receiverId)
    .collection(FRIEND_REQUEST_RECORD)
    .add({
      senderId,
      message: message ?? '',
      status: 'pending',
      createdAt: Timestamp.fromDate(new Date()),
    } satisfies FriendRequest);

  await pushFriendRequestNoti(receiverId, senderId);

  const createdFriendRequest = (await friendRequestRef.get()).data() as FriendRequest;

  return {
    requestId: friendRequestRef.id,
    receiverId,
    ...createdFriendRequest,
    createdAt: createdFriendRequest.createdAt.toDate(),
  };
}
