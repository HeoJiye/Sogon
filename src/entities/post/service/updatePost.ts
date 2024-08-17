import { Timestamp } from 'firebase-admin/firestore';

import { ForbiddenError } from '@/shard/model';

import { type EditPostRequestDTO, type EditPostResponseDTO, Post } from '../model';
import { getPostRefById } from './getPostById';

export async function updatePost(
  userId: string,
  postId: string,
  data: EditPostRequestDTO
): Promise<EditPostResponseDTO> {
  const postRef = await getPostRefById(postId);

  if (postRef.path.split('/')[1] !== userId) {
    throw new ForbiddenError('이 게시글을 수정할 권한이 없습니다.');
  }

  await postRef.update({
    ...data,
    updatedAt: Timestamp.fromDate(new Date()),
  } satisfies Partial<Post>);

  const editedPost = (await postRef.get()).data() as Post;

  return {
    postId: postRef.id,
    content: editedPost.content,
    imageUrls: editedPost.imageUrls,
    createdAt: editedPost.createdAt.toDate(),
    updatedAt: editedPost.updatedAt.toDate(),
  };
}
