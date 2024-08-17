import { Timestamp } from 'firebase-admin/firestore';

export const POST_RECORD = 'posts' as const;

export type Post = {
  content: string;
  imageUrls: string[];
  likeCount: number;
  commentCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
