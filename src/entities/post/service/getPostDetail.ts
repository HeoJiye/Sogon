import { getSimpleUser } from '@/entities/user/service';
import { isFriend } from '@/features/friend/service';
import { ForbiddenError } from '@/shared/model';

import { Post, type PostDetailsResponseDTO } from '../model';
import { getPostRefById } from './getPostRefById';

export async function getPostDetails(userId: string, postId: string): Promise<PostDetailsResponseDTO> {
  const postRef = await getPostRefById(postId);

  const authorId = postRef.path.split('/')[1];

  if (await isFriend(userId, authorId)) {
    throw new ForbiddenError('게시글을 조회할 수 있는 권한이 없습니다.');
  }

  const post = (await postRef.get()).data() as Post;

  return {
    postId,
    author: await getSimpleUser(authorId),
    content: post.content,
    imageUrls: post.imageUrls || [],
    createdAt: post.createdAt.toDate(),
    updatedAt: post.updatedAt.toDate(),
  };
}
