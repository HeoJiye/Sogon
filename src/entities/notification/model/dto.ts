import { NotificationStatus, NotificationType } from './schema';

export type NotificationResponseDTO = {
  notificationId: string;
  type: NotificationType;
  url: string;
  message: string;
  createdAt: Date;
};

export type NotificationUpdateResponseDTO = {
  notificationId: string;
  type: NotificationType;
  url: string;
  message: string;
  status: NotificationStatus;
  createdAt: Date;
};
