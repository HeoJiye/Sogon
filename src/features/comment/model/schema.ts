import { Timestamp } from 'firebase-admin/firestore';

export const COMMENT_RECORD = 'comments' as const;

export type Comment = {
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
