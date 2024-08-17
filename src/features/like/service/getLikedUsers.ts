import { DocumentReference } from 'firebase-admin/firestore';

import { getFriendIds } from '@/features/friend/service';

import { LIKE_RECORD } from '../model';

export async function getLikedUsers(userId: string, postRef: DocumentReference): Promise<string[]> {
  const visuableUsers = [userId, ...(await getFriendIds(userId))];
  const likesRef = postRef.collection(LIKE_RECORD).where('userId', 'in', visuableUsers);

  return (await likesRef.get()).docs.map((doc) => doc.id);
}
