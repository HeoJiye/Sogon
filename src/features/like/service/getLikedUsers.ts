import { DocumentReference } from 'firebase-admin/firestore';

import { getFriendIds } from '@/features/friend/service';

import { LIKE_RECORD } from '../model';

export async function getLikedUsers(userId: string, postRef: DocumentReference): Promise<string[]> {
  const friendIds = await getFriendIds(userId);
  const likesRef = postRef.collection(LIKE_RECORD).where('userId', 'in', friendIds);

  return (await likesRef.get()).docs.map((doc) => doc.id).filter(friendIds.includes);
}
