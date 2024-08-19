import { Timestamp } from 'firebase-admin/firestore';

import { Post } from '@/entities/post/model';
import { getPostRefById } from '@/entities/post/service';
import { db } from '@/shared/lib/firebaseAdmin';

import { COMMENT_RECORD, Comment, EditCommentRequestDTO, EditCommentResponseDTO } from '../model';

export async function createComment(
  userId: string,
  postId: string,
  { content }: EditCommentRequestDTO
): Promise<EditCommentResponseDTO> {
  const postRef = await getPostRefById(postId);
  const commentRef = postRef.collection(COMMENT_RECORD).doc();

  const timestamp = Timestamp.fromDate(new Date());

  await db.runTransaction(async (transaction) => {
    const post = (await transaction.get(postRef)).data() as Post;

    transaction.update(postRef, {
      commentCount: post.commentCount + 1,
    } satisfies Partial<Post>);

    transaction.create(commentRef, {
      authorId: userId,
      content,
      createdAt: timestamp,
      updatedAt: timestamp,
    } satisfies Comment);
  });

  const editedComment = (await commentRef.get()).data() as Comment;

  return {
    postId,
    commentId: commentRef.id,
    ...editedComment,
    createdAt: editedComment.createdAt.toDate(),
    updatedAt: editedComment.updatedAt.toDate(),
  };
}
