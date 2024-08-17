import { ForbiddenError } from '@/shard/model';

import { getPostRefById } from './getPostRefById';

export async function deletePost(userId: string, postId: string): Promise<void> {
  const postRef = await getPostRefById(postId);

  if (postRef.path.split('/')[1] !== userId) {
    throw new ForbiddenError('이 게시글을 삭제할 권한이 없습니다.');
  }

  await postRef.delete();
}
