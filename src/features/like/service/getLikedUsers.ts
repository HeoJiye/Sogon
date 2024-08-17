import { getPostRefById } from '@/entities/post/service';
import { UserSimpleDTO } from '@/entities/user/model';
import { getSimpleUser } from '@/entities/user/service';
import { getFriendIds } from '@/features/friend/service';

import { LIKE_RECORD } from '../model';

export async function getLikedUsers(userId: string, postId: string): Promise<UserSimpleDTO[]> {
  const visuableUsers = [userId, ...(await getFriendIds(userId))];

  const postRef = await getPostRefById(postId);
  const likesRef = postRef.collection(LIKE_RECORD).where('userId', 'in', visuableUsers);

  return Promise.all((await likesRef.get()).docs.map((doc) => getSimpleUser(doc.id)));
}
