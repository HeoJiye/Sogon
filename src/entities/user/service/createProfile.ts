import { Timestamp } from 'firebase-admin/firestore';

import { db } from '@/shared/lib/firebaseAdmin';
import { ConflictError } from '@/shared/model';

import { type EditProfileRequestDTO, type EditProfileResponseDTO, USER_RECORD, type User } from '../model';

export async function createProfile(
  userId: string,
  { nickname, profileImage, bio }: EditProfileRequestDTO
): Promise<EditProfileResponseDTO> {
  const userRef = db.collection(USER_RECORD).doc(userId);
  const doc = await userRef.get();
  if (doc.exists) {
    throw new ConflictError('해당 사용자에 대한 프로필이 이미 존재합니다.');
  }

  const timestamp = Timestamp.fromDate(new Date());

  await userRef.set({
    nickname,
    profileImage: profileImage ?? null,
    bio,
    createdAt: timestamp,
    updatedAt: timestamp,
  } satisfies User);

  const editedUser = (await userRef.get()).data() as User;

  return {
    userId,
    ...editedUser,
    createdAt: editedUser.createdAt.toDate(),
    updatedAt: editedUser.updatedAt.toDate(),
  };
}
