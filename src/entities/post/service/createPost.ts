import { Timestamp } from 'firebase-admin/firestore';

import { USER_RECORD } from '@/entities/user/model';
import { db } from '@/shared/lib/firebaseAdmin';

import { EditPostRequestDTO, type EditPostResponseDTO, POST_RECORD, type Post } from '../model';

export async function createPost(
  userId: string,
  { content, imageUrls }: EditPostRequestDTO
): Promise<EditPostResponseDTO> {
  const timestamp = Timestamp.fromDate(new Date());

  const postRef = await db
    .collection(USER_RECORD)
    .doc(userId)
    .collection(POST_RECORD)
    .add({
      content,
      imageUrls,
      likeCount: 0,
      commentCount: 0,
      createdAt: timestamp,
      updatedAt: timestamp,
    } satisfies Post);

  const editedPost = (await postRef.get()).data() as Post;

  return {
    postId: postRef.id,
    content: editedPost.content,
    imageUrls: editedPost.imageUrls,
    createdAt: editedPost.createdAt.toDate(),
    updatedAt: editedPost.updatedAt.toDate(),
  };
}
