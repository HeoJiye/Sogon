import { Timestamp } from 'firebase-admin/firestore';

export const USER_RECORD = 'users' as const;

export type User = {
  nickname: string;
  profileImage: string | null;
  bio: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
