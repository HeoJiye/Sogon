import { USER_RECORD, User } from '@/entities/user/model';
import { db } from '@/shard/lib/firebaseAdmin';

import { FRIEND_REQUEST_RECORD, FriendRequest, type FriendRequestResponseDTO } from '../model';

export async function getPendingFriendRequests(userId: string): Promise<FriendRequestResponseDTO[]> {
  const friendRequestsRef = db.collection(USER_RECORD).doc(userId).collection(FRIEND_REQUEST_RECORD);
  const snapshot = await friendRequestsRef.where('status', '==', 'pending').get();

  if (snapshot.empty) {
    return [];
  }

  return Promise.all(
    snapshot.docs.map(async (doc) => {
      const data = doc.data() as FriendRequest;

      const senderRef = db.collection(USER_RECORD).doc(data.senderId);
      const senderDoc = await senderRef.get();

      const senderData = senderDoc.data() as User;

      return {
        requestId: doc.id,
        sender: {
          userId: senderDoc.id,
          nickname: senderData?.nickname || '',
          profileImage: senderData?.profileImage || null,
        },
        message: data.message || '',
        createdAt: data.createdAt.toDate(),
      } satisfies FriendRequestResponseDTO;
    })
  );
}
