import { Timestamp } from 'firebase-admin/firestore';

import { Post } from '@/entities/post/model';
import { getPostRefById } from '@/entities/post/service';
import { db } from '@/shard/lib/firebaseAdmin';
import { ConflictError } from '@/shard/model/ApiErrors';

import { LIKE_RECORD, Like, LikeResponseDTO } from '../model';

export async function createLike(userId: string, postId: string): Promise<LikeResponseDTO> {
  const postRef = await getPostRefById(postId);
  const likeRef = postRef.collection(LIKE_RECORD).doc(userId);

  if ((await likeRef.get()).exists) {
    throw new ConflictError('이미 이 게시글을 좋아합니다.');
  }

  const timestamp = Timestamp.fromDate(new Date());

  await db.runTransaction(async (transaction) => {
    const post = (await transaction.get(postRef)).data() as Post;

    transaction.update(postRef, {
      likeCount: post.likeCount + 1,
    } satisfies Partial<Post>);

    transaction.create(likeRef, {
      createdAt: timestamp,
    } satisfies Like);
  });

  const createdLike = (await likeRef.get()).data() as Like;

  return {
    postId,
    userId,
    likeId: likeRef.id,
    createdAt: createdLike.createdAt.toDate(),
  };
}
