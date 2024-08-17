import { Timestamp } from 'firebase-admin/firestore';

import { USER_RECORD } from '@/entities/user/model';
import { db } from '@/shard/lib/firebaseAdmin';

import { NOTIFICATION_RECORD, Notification } from '../model';

function getUserName(userId: string) {
  return db
    .collection(USER_RECORD)
    .doc(userId)
    .get()
    .then((ref) => ref.data()?.name);
}

export async function pushFriendNoti(receiverId: string, senderId: string) {
  const senderName = await getUserName(senderId);

  db.collection(USER_RECORD)
    .doc(receiverId)
    .collection(NOTIFICATION_RECORD)
    .add({
      type: 'friend',
      url: `/profile/${senderId}`,
      message: `${senderName}와 친구가 되었습니다.`,
      status: 'pending',
      createdAt: Timestamp.fromDate(new Date()),
    } satisfies Notification);
}

export async function pushFriendRequestNoti(receiverId: string, senderId: string) {
  const senderName = await getUserName(senderId);

  db.collection(USER_RECORD)
    .doc(receiverId)
    .collection(NOTIFICATION_RECORD)
    .add({
      type: 'friend-request',
      url: `/profile/${senderId}`,
      message: `${senderName}가 친구 요청을 보냈습니다.`,
      status: 'pending',
      createdAt: Timestamp.fromDate(new Date()),
    } satisfies Notification);
}

export async function pushLikeNoti(receiverId: string, senderId: string, postId: string) {
  const senderName = await getUserName(senderId);

  db.collection(USER_RECORD)
    .doc(receiverId)
    .collection(NOTIFICATION_RECORD)
    .add({
      type: 'like',
      url: `/post/${postId}`,
      message: `${senderName}가 회원님의 게시글이 좋대요.`,
      status: 'pending',
      createdAt: Timestamp.fromDate(new Date()),
    } satisfies Notification);
}

export async function pushCommentNoti(receiverId: string, senderId: string, postId: string, comment: string) {
  const senderName = await getUserName(senderId);

  db.collection(USER_RECORD)
    .doc(receiverId)
    .collection(NOTIFICATION_RECORD)
    .add({
      type: 'comment',
      url: `/post/${postId}`,
      message: `${senderName}: ${comment}\n회원님의 게시글에 댓글이 달렸습니다.`,
      status: 'pending',
      createdAt: Timestamp.fromDate(new Date()),
    } satisfies Notification);
}
