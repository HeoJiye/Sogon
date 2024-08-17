export type NotificationResponseDTO = {
  notificationId: string;
  type: 'friend' | 'friend-request' | 'like' | 'comment';
  url: string;
  message: string;
  createdAt: Date;
};
