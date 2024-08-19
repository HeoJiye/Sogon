import { USER_RECORD } from '@/entities/user/model';
import { db } from '@/shared/lib/firebaseAdmin';

import { FRIEND_RECORD } from '../model';

export async function isFriend(curUserId: string, userId: string): Promise<boolean> {
  const userRef = db.collection(USER_RECORD).doc(curUserId).collection(FRIEND_RECORD).doc(userId);
  const targetUserRef = db.collection(USER_RECORD).doc(userId).collection(FRIEND_RECORD).doc(curUserId);

  const [userDoc, targetUserDoc] = await Promise.all([userRef.get(), targetUserRef.get()]);

  return userDoc.exists && targetUserDoc.exists;
}
