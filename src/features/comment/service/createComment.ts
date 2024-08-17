import { Timestamp } from 'firebase-admin/firestore';

import { getPostRefById } from '@/entities/post/service';

import { COMMENT_RECORD, Comment, EditCommentRequestDTO, EditCommentResponseDTO } from '../model';

export async function createComment(
  userId: string,
  postId: string,
  { content }: EditCommentRequestDTO
): Promise<EditCommentResponseDTO> {
  const postRef = await getPostRefById(postId);

  const timestamp = Timestamp.fromDate(new Date());

  const commentRef = await postRef.collection(COMMENT_RECORD).add({
    authorId: userId,
    content,
    createdAt: timestamp,
    updatedAt: timestamp,
  } satisfies Comment);

  const editedComment = (await commentRef.get()).data() as Comment;

  return {
    postId,
    commentId: commentRef.id,
    ...editedComment,
    createdAt: editedComment.createdAt.toDate(),
    updatedAt: editedComment.updatedAt.toDate(),
  };
}
