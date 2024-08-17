import { Timestamp } from 'firebase-admin/firestore';

export const COMMENT_RECORD = 'comments' as const;

export type Comment = {
  authorId: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
