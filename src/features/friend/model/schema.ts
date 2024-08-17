import { Timestamp } from 'firebase-admin/firestore';

export const FRIEND_RECORD = 'friends' as const;

export type Friend = {
  createdAt: Timestamp;
};
