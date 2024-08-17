import { Timestamp } from 'firebase-admin/firestore';

export const LIKE_RECORD = 'likes' as const;

export type Like = {
  userId: string;
  postId: string;
  createdAt: Timestamp;
};
