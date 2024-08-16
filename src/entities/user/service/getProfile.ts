import { db } from '@/shard/lib/firebaseAdmin';
import { InternalServerError, NotFoundError } from '@/shard/model';

import { ProfileResponseDTO, USER_RECORD, type User, UserReleationStatus, profileResponseSchema } from '../model';

async function getFriendStatus(curUserId: string, userId: string): Promise<UserReleationStatus> {
  if (curUserId === userId) {
    return 'self';
  }

  const friendsRef = db.collection(USER_RECORD).doc(curUserId).collection('friends').doc(userId);
  const friendDoc = await friendsRef.get();

  if (friendDoc.exists) {
    return 'friends';
  }
  const friendRequestRef1 = db.collection(USER_RECORD).doc(curUserId).collection('friendRequests').doc(userId);
  const friendRequestDoc1 = await friendRequestRef1.get();

  const friendRequestRef2 = db.collection(USER_RECORD).doc(userId).collection('friendRequests').doc(curUserId);
  const friendRequestDoc2 = await friendRequestRef2.get();

  if (friendRequestDoc1.exists || friendRequestDoc2.exists) {
    return 'pending';
  }
  return 'none';
}

async function getProfile(curUserId: string, userId: string): Promise<ProfileResponseDTO> {
  const userRef = db.collection(USER_RECORD).doc(userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    throw new NotFoundError('해당 사용자에 대한 프로필이 존재하지 않습니다.');
  }

  const user = doc.data() as User;
  const status = await getFriendStatus(curUserId, userId);

  const result = profileResponseSchema.safeParse({ userId, ...user, status });

  if (!result.success) {
    throw new InternalServerError('유효하지 않은 응답이 생성되었습니다.');
  }
  return result.data;
}

export default getProfile;
