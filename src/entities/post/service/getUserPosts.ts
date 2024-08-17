import { USER_RECORD, User } from '@/entities/user/model';
import { db } from '@/shard/lib/firebaseAdmin';

import { Author, POST_RECORD, type Post, type PostResponseDTO } from '../model';

function generatePostResponseDTO(postId: string, post: Post, author: Author): PostResponseDTO {
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

  const UserRecord = db.collection(USER_RECORD).doc(userId);
  const userSnapshot = await UserRecord.get();
  const user = userSnapshot.data() as User;
  const author: Author = {
    userId,
    nickname: user.nickname,
    profileImage: user.profileImage ?? null,
  };

  return postsSnapshot.docs
    .map((postDoc) => {
      const post = postDoc.data() as Post;
      return generatePostResponseDTO(postDoc.id, post, author);
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
