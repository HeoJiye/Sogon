import { DocumentReference } from 'firebase-admin/firestore';

import { db } from '@/shard/lib/firebaseAdmin';
import { NotFoundError } from '@/shard/model';

import { POST_RECORD } from '../model';

export async function getPostRefById(postId: string): Promise<DocumentReference> {
  const postsRef = db.collectionGroup(POST_RECORD).where('__name__', '==', postId).limit(1);
  const querySnapshot = await postsRef.get();

  if (querySnapshot.empty) {
    throw new NotFoundError('해당 게시글을 찾을 수 없습니다.');
  }
  return querySnapshot.docs[0].ref;
}
