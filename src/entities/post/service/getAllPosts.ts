import { USER_RECORD } from '@/entities/user/model';
import { FRIEND_RECORD } from '@/features/friend/model';
import { db } from '@/shared/lib/firebaseAdmin';

import { type PostResponseDTO } from '../model';
import { getUserPosts } from './getUserPosts';

export async function getAllPosts(userId: string): Promise<PostResponseDTO[]> {
  const userRef = db.collection(USER_RECORD).doc(userId);

  const friendsSnapshot = await userRef.collection(FRIEND_RECORD).get();
  const friendIds = friendsSnapshot.docs.map((doc) => doc.id);

  return (await Promise.all([userId, ...friendIds].map(getUserPosts)))
    .flat()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
