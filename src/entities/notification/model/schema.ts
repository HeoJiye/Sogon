import { Timestamp } from 'firebase-admin/firestore';

export const NOTIFICATION_RECORD = 'notifications' as const;

export type NotificationType = 'friend' | 'friend-request' | 'like' | 'comment';

export type NotificationStatus = 'pending' | 'read' | 'unread';

export type Notification = {
  type: NotificationType;
  url?: string;
  message: string;
  status: NotificationStatus;
  createdAt: Timestamp;
};
