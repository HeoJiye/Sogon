import { getPostRefById } from '@/entities/post/service';
import { ForbiddenError, NotFoundError } from '@/shard/model';

import { COMMENT_RECORD } from '../model';

export async function deleteComment(userId: string, postId: string, commentId: string): Promise<void> {
  const commentRef = (await getPostRefById(postId)).collection(COMMENT_RECORD).doc(commentId);
  const commentSnap = await commentRef.get();

  if (!commentSnap.exists) {
    throw new NotFoundError('해당 댓글을 찾을 수 없습니다.');
  }

  if (userId !== commentSnap.data()?.userId) {
    throw new ForbiddenError('이 댓글을 삭제할 권한이 없습니다.');
  }

  await commentRef.delete();
}
