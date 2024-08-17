import { USER_RECORD } from '@/entities/user/model';
import { db } from '@/shard/lib/firebaseAdmin';
import { BadRequestError, ConflictError, NotFoundError } from '@/shard/model';

import { NOTIFICATION_RECORD, type Notification, type NotificationUpdateResponseDTO } from '../model';

export async function updateNotificationStatus(
  userId: string,
  notificationId: string
): Promise<NotificationUpdateResponseDTO> {
  const notificationRef = db.collection(USER_RECORD).doc(userId).collection(NOTIFICATION_RECORD).doc(notificationId);
  const doc = await notificationRef.get();

  if (!doc.exists) {
    throw new NotFoundError('해당 알림을 찾을 수 없습니다.');
  }

  const notification = doc.data() as Notification;

  if (notification.status === 'read') {
    throw new ConflictError('이미 읽음 처리된 알림입니다.');
  }

  if (notification.status === 'pending') {
    throw new BadRequestError('아직 전송되지 않은 알림입니다.');
  }

  await notificationRef.update({ status: 'read' } satisfies Partial<Notification>);

  return {
    notificationId: doc.id,
    type: notification.type,
    url: notification.url ?? '',
    message: notification.message,
    status: notification.status,
    createdAt: notification.createdAt.toDate(),
  };
}
