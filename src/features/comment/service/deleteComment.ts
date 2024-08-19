import { Post } from '@/entities/post/model';
import { getPostRefById } from '@/entities/post/service';
import { db } from '@/shared/lib/firebaseAdmin';
import { ForbiddenError, NotFoundError } from '@/shared/model';

import { COMMENT_RECORD } from '../model';

export async function deleteComment(userId: string, postId: string, commentId: string): Promise<void> {
  const postRef = await getPostRefById(postId);
  const commentRef = postRef.collection(COMMENT_RECORD).doc(commentId);
  const commentSnap = await commentRef.get();

  if (!commentSnap.exists) {
    throw new NotFoundError('해당 댓글을 찾을 수 없습니다.');
  }

  if (userId !== commentSnap.data()?.userId) {
    throw new ForbiddenError('이 댓글을 삭제할 권한이 없습니다.');
  }

  await db.runTransaction(async (transaction) => {
    const post = (await transaction.get(postRef)).data() as Post;

    transaction.update(postRef, {
      commentCount: post.commentCount - 1,
    } satisfies Partial<Post>);

    transaction.delete(commentRef);
  });

  await commentRef.delete();
}
