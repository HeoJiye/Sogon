import { db } from '@/shard/lib/firebaseAdmin';
import { NotFoundError } from '@/shard/model/errors/APIErrors';

import { type EditProfileRequestDTO, type EditProfileResponseDTO, USER_RECORD, type User } from '../../model';

async function updateProfile(
  userId: string,
  { nickname, profileImage, bio }: EditProfileRequestDTO
): Promise<EditProfileResponseDTO> {
  const userRef = db.collection(USER_RECORD).doc(userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    throw new NotFoundError('해당 사용자에 대한 프로필이 존재하지 않습니다.');
  }

  await userRef.update({
    nickname,
    profileImage: profileImage ?? null,
    bio,
    updatedAt: new Date(),
  } satisfies Partial<User>);

  const editedUser = (await userRef.get()).data() as User;

  return { userId, ...editedUser } satisfies EditProfileResponseDTO;
}

export default updateProfile;
