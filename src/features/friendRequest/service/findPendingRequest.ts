import { QuerySnapshot } from 'firebase-admin/firestore';

import { USER_RECORD } from '@/entities/user/model';
import { db } from '@/shared/lib/firebaseAdmin';

import { FRIEND_REQUEST_RECORD } from '../model';

export function findPendingRequestSnapshot(userId: string, friendId: string): Promise<QuerySnapshot> {
  return db
    .collection(USER_RECORD)
    .doc(userId)
    .collection(FRIEND_REQUEST_RECORD)
    .where('senderId', '==', friendId)
    .where('status', '==', 'pending')
    .get();
}
