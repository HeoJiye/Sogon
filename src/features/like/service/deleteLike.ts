import { Post } from '@/entities/post/model';
import { getPostRefById } from '@/entities/post/service';
import { db } from '@/shard/lib/firebaseAdmin';
import { BadRequestError } from '@/shard/model/ApiErrors';

import { LIKE_RECORD } from '../model';

export async function deleteLike(userId: string, postId: string): Promise<void> {
  const postRef = await getPostRefById(postId);
  const likeRef = postRef.collection(LIKE_RECORD).doc(userId);

  const likeSnap = await likeRef.get();
  if (!likeSnap.exists) {
    throw new BadRequestError('좋아요를 누르지 않아서 취소할 수 없습니다.');
  }

  await db.runTransaction(async (transaction) => {
    const post = (await transaction.get(postRef)).data() as Post;

    transaction.update(postRef, {
      likeCount: post.likeCount - 1,
    } satisfies Partial<Post>);

    transaction.delete(likeRef);
  });
}
