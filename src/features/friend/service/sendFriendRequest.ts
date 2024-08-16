import { USER_RECORD } from '@/entities/user/model';
import { db } from '@/shard/lib/firebaseAdmin';
import { ConflictError, ForbiddenError, NotFoundError } from '@/shard/model';

import { FRIEND_REQUEST_RECORD, FriendRequest, SendFriendResponseDTO } from '../model';

async function isRequestExists(senderId: string, receiverId: string): Promise<boolean> {
  const existingRequests = await Promise.all([
    db.collection(USER_RECORD).doc(receiverId).collection(FRIEND_REQUEST_RECORD).doc(senderId).get(),
    db.collection(USER_RECORD).doc(senderId).collection(FRIEND_REQUEST_RECORD).doc(receiverId).get(),
  ]);

  return existingRequests.some((requests) => requests.exists);
}

export async function sendFriendRequest(
  senderId: string,
  receiverId: string,
  message?: string
): Promise<SendFriendResponseDTO> {
  if (senderId === receiverId) {
    throw new ForbiddenError('본인에게 친구 요청을 보낼 수 없습니다.');
  }

  if (!(await db.collection(USER_RECORD).doc(receiverId).get()).exists) {
    throw new NotFoundError('해당 사용자를 찾을 수 없습니다.');
  }

  if (await isRequestExists(senderId, receiverId)) {
    throw new ConflictError('이미 친구 요청을 보냈거나, 받았습니다.');
  }

  const friendRequestRef = db.collection(USER_RECORD).doc(receiverId).collection(FRIEND_REQUEST_RECORD).doc();
  const requestId = friendRequestRef.id;

  await friendRequestRef.set({
    senderId,
    message: message || '',
    status: 'pending',
    createdAt: new Date(),
  } satisfies FriendRequest);

  const createdRequest = (await friendRequestRef.get()).data() as FriendRequest;

  return { requestId, receiverId, ...createdRequest };
}
