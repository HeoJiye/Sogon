export const NOTIFICATION_RECORD = 'users' as const;

export type NotificationType = 'friend' | 'friend-request' | 'like' | 'comment';

export type NotificationStatus = 'pending' | 'read' | 'unread';

export type Notification = {
  type: NotificationType;
  url?: string;
  message: string;
  status: NotificationStatus;
  createdAt: Date;
};
