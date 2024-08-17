import { USER_RECORD } from '@/entities/user/model';
import { db } from '@/shard/lib/firebaseAdmin';

import { NOTIFICATION_RECORD, type Notification, type NotificationResponseDTO } from '../model';

export async function getNotifications(userId: string): Promise<NotificationResponseDTO[]> {
  const notificationsRef = db.collection(USER_RECORD).doc(userId).collection(NOTIFICATION_RECORD);
  const snapshot = await notificationsRef.where('status', '==', 'unread').get();

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map((doc) => {
    const data = doc.data() as Notification;

    return {
      notificationId: doc.id,
      type: data.type,
      url: data.url ?? '',
      message: data.message,
      createdAt: data.createdAt.toDate(),
    } satisfies NotificationResponseDTO;
  });
}
