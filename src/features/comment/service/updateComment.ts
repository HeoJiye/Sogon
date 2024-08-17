import { Timestamp } from 'firebase-admin/firestore';

import { getPostRefById } from '@/entities/post/service';
import { ForbiddenError, NotFoundError } from '@/shard/model';

import { COMMENT_RECORD, Comment, EditCommentRequestDTO, EditCommentResponseDTO } from '../model';

export async function updateComment(
  userId: string,
  postId: string,
  commentId: string,
  { content }: EditCommentRequestDTO
): Promise<EditCommentResponseDTO> {
  const commentRef = (await getPostRefById(postId)).collection(COMMENT_RECORD).doc(commentId);
  const commentSnap = await commentRef.get();

  if (!commentSnap.exists) {
    throw new NotFoundError('해당 댓글을 찾을 수 없습니다.');
  }

  if (userId !== commentSnap.data()?.userId) {
    throw new ForbiddenError('이 댓글을 수정할 권한이 없습니다.');
  }

  await commentRef.update({
    content,
    updatedAt: Timestamp.fromDate(new Date()),
  } satisfies Partial<Comment>);

  const editedComment = (await commentRef.get()).data() as Comment;

  return {
    postId,
    commentId: commentRef.id,
    ...editedComment,
    createdAt: editedComment.createdAt.toDate(),
    updatedAt: editedComment.updatedAt.toDate(),
  };
}
