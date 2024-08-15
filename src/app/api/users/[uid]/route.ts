import { type NextRequest, NextResponse } from 'next/server';

import {
  type CreateProfileDTO,
  USER_RECORD,
  type User,
  type ViewProfileDTO,
  createProfileSchema,
  viewProfileSchema,
} from '@/entities/user/model';
import { db } from '@/shard/lib/firebaseAdmin';
import {
  UID_HEADER_FIELD,
  VALIDATED_BODY_HEADER_FIELD,
  emailVerifiedMiddleware,
  handler,
  tokenMiddleware,
  validateMiddleware,
} from '@/shard/lib/middleware';
import { ForbiddenError, InternalServerError, NotFoundError } from '@/shard/model/errors/APIErrors';

async function updateProfile(request: NextRequest, { params }: { params: { uid: string } }) {
  const userId = request.headers.get(UID_HEADER_FIELD);
  if (!userId) {
    return new InternalServerError('인증 미들웨어에 문제가 있습니다. 개발자에게 문의해주세요.').toResponse();
  }

  if (userId !== params.uid) {
    return new ForbiddenError('해당 사용자의 프로필을 수정할 권한이 없습니다.').toResponse();
  }

  const userRef = db.collection(USER_RECORD).doc(userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    return new NotFoundError('해당 사용자 프로필을 찾을 수 없습니다.').toResponse();
  }

  const body = request.headers.get(VALIDATED_BODY_HEADER_FIELD);
  if (!body) {
    return new InternalServerError('body 검증 미들웨어에 문제가 있습니다. 개발자에게 문의해주세요.').toResponse();
  }

  const { nickname, profileImage = null, bio } = JSON.parse(body) satisfies CreateProfileDTO;

  await userRef.update({
    nickname,
    profileImage,
    bio,
    updatedAt: new Date(),
  } satisfies Partial<User>);

  return NextResponse.json({ userId, ...(await userRef.get()).data() }, { status: 200 });
}

export const PUT = handler(
  tokenMiddleware,
  emailVerifiedMiddleware,
  validateMiddleware(createProfileSchema),
  updateProfile
);

async function getFriendStatus(currentUserId: string, userId: string) {
  if (currentUserId === userId) {
    return 'self';
  }

  const friendsRef = db.collection('users').doc(currentUserId).collection('friends').doc(userId);
  const friendDoc = await friendsRef.get();

  if (friendDoc.exists) {
    return 'friends';
  }
  const friendRequestRef1 = db.collection('users').doc(currentUserId).collection('friendRequests').doc(userId);
  const friendRequestDoc1 = await friendRequestRef1.get();

  const friendRequestRef2 = db.collection('users').doc(currentUserId).collection('friendRequests').doc(userId);
  const friendRequestDoc2 = await friendRequestRef2.get();

  if (friendRequestDoc1.exists || friendRequestDoc2.exists) {
    return 'pending';
  }
  return 'none';
}

async function getUserProfile(request: NextRequest, { params }: { params: { uid: string } }) {
  const currentUserId = request.headers.get(UID_HEADER_FIELD);
  const userId = params.uid;

  if (!currentUserId) {
    return new InternalServerError('인증 미들웨어에 문제가 있습니다. 개발자에게 문의해주세요.').toResponse();
  }

  const userRef = db.collection(USER_RECORD).doc(userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    return new NotFoundError('해당 사용자 프로필을 찾을 수 없습니다.').toResponse();
  }

  const userData = doc.data();

  const status = await getFriendStatus(currentUserId, userId);

  return NextResponse.json(
    {
      userId,
      nickname: userData?.nickname,
      profileImage: userData?.profileImage,
      bio: userData?.bio,
      status,
    } satisfies ViewProfileDTO,
    { status: 200 }
  );
}

export const GET = handler(
  tokenMiddleware,
  emailVerifiedMiddleware,
  validateMiddleware(viewProfileSchema),
  getUserProfile
);
