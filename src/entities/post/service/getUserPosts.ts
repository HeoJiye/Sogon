import { USER_RECORD, UserSimpleDTO } from '@/entities/user/model';
import { getSimpleUser } from '@/entities/user/service';
import { db } from '@/shared/lib/firebaseAdmin';

import { POST_RECORD, type Post, type PostResponseDTO } from '../model';

function generatePostResponseDTO(postId: string, post: Post, author: UserSimpleDTO): PostResponseDTO {
  return {
    postId,
    author,
    content: post.content,
    imageUrls: post.imageUrls || [],
    likeCount: post.likeCount,
    commentCount: post.commentCount,
    createdAt: post.createdAt.toDate(),
    updatedAt: post.updatedAt.toDate(),
  };
}

export async function getUserPosts(userId: string): Promise<PostResponseDTO[]> {
  const postsRef = db.collection(USER_RECORD).doc(userId).collection(POST_RECORD);
  const postsSnapshot = await postsRef.get();

  const author = await getSimpleUser(userId);

  return postsSnapshot.docs
    .map((postDoc) => {
      const post = postDoc.data() as Post;
      return generatePostResponseDTO(postDoc.id, post, author);
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
