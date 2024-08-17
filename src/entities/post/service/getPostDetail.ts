import { DocumentReference } from 'firebase-admin/firestore';

import { getSimpleUser } from '@/entities/user/service';
import { getFriendIds, isFriend } from '@/features/friend/service';
import { ForbiddenError } from '@/shard/model';

import { LIKE_RECORD, Post, type PostDetailsResponseDTO } from '../model';
import { getPostRefById } from './getPostById';

async function getLikes(userId: string, postRef: DocumentReference): Promise<string[]> {
  const friendIds = await getFriendIds(userId);
  const likesRef = postRef.collection(LIKE_RECORD).where('userId', 'in', friendIds);

  return (await likesRef.get()).docs.map((doc) => doc.id).filter(friendIds.includes);
}

export async function getPostDetails(userId: string, postId: string): Promise<PostDetailsResponseDTO> {
  const postRef = await getPostRefById(postId);

  const authorId = postRef.path.split('/')[1];

  if (await isFriend(userId, authorId)) {
    throw new ForbiddenError('게시글을 조회할 수 있는 권한이 없습니다.');
  }

  const post = (await postRef.get()).data() as Post;

  const likes = await Promise.all((await getLikes(userId, postRef)).map(getSimpleUser));

  return {
    postId,
    author: await getSimpleUser(authorId),
    content: post.content,
    imageUrls: post.imageUrls || [],
    likes,
    createdAt: post.createdAt.toDate(),
    updatedAt: post.updatedAt.toDate(),
  };
}
