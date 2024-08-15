import { type NextRequest, NextResponse } from 'next/server';

import { type CreateProfileDTO, USER_RECORD, type User, createProfileSchema } from '@/entities/user/model';
import { db } from '@/shard/lib/firebaseAdmin';
import {
  UID_HEADER_FIELD,
  VALIDATED_BODY_HEADER_FIELD,
  handler,
  tokenMiddleware,
  validateMiddleware,
} from '@/shard/lib/middleware';
import { ConflictError, InternalServerError } from '@/shard/model/errors/APIErrors';

async function createProfile(request: NextRequest) {
  const userId = request.headers.get(UID_HEADER_FIELD);
  if (!userId) {
    return new InternalServerError('인증 미들웨어에 문제가 있습니다. 개발자에게 문의해주세요.').toResponse();
  }

  const userRef = db.collection(USER_RECORD).doc(userId);
  const doc = await userRef.get();
  if (doc.exists) {
    return new ConflictError('해당 사용자에 대한 프로필이 이미 존재합니다.').toResponse();
  }

  const body = request.headers.get(VALIDATED_BODY_HEADER_FIELD);
  if (!body) {
    return new InternalServerError('body 검증 미들웨어에 문제가 있습니다. 개발자에게 문의해주세요.').toResponse();
  }

  const { nickname, profileImage = null, bio } = JSON.parse(body) satisfies CreateProfileDTO;

  await userRef.set({
    nickname,
    profileImage,
    bio,
    createdAt: new Date(),
    updatedAt: new Date(),
  } satisfies User);

  return NextResponse.json({ userId, ...(await userRef.get()).data() }, { status: 201 });
}

export const POST = handler(tokenMiddleware, validateMiddleware(createProfileSchema), createProfile);
