import { getPostRefById } from '@/entities/post/service';
import { getSimpleUser } from '@/entities/user/service';
import { getFriendIds } from '@/features/friend/service';

import { COMMENT_RECORD, Comment, CommentResponseDTO } from '../model';

export async function generateCommentResponseDTO(
  doc: FirebaseFirestore.QueryDocumentSnapshot
): Promise<CommentResponseDTO> {
  const comment = doc.data() as Comment;

  return {
    commentId: doc.id,
    author: await getSimpleUser(comment.authorId),
    content: comment.content,
    createdAt: comment.createdAt.toDate(),
    updatedAt: comment.updatedAt.toDate(),
  };
}

export async function getComments(userId: string, postId: string): Promise<CommentResponseDTO[]> {
  const postRef = await getPostRefById(postId);
  const visuableUsers = [userId, ...(await getFriendIds(userId))];

  const commentsSnap = await postRef.collection(COMMENT_RECORD).where('authorId', 'in', visuableUsers).get();

  return Promise.all(commentsSnap.docs.map(generateCommentResponseDTO));
}
