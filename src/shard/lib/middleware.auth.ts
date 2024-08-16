import { FirebaseAuthError } from 'firebase-admin/auth';
import type { NextRequest } from 'next/server';

import { auth } from '@/shard/lib/firebaseAdmin';
import { ForbiddenError, InternalServerError, UnauthorizedError } from '@/shard/model/errors/APIErrors';
import { FIREBASE_AUTH_ERROR } from '@/shard/model/errors/firebaseErrors';

import { NextAPIContext } from '../model/type';

export const UID_HEADER_FIELD = 'x-uid';

export async function tokenMiddleware(request: NextRequest, context: NextAPIContext, next: () => symbol) {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return new UnauthorizedError('로그인이 필요합니다.').toResponse();
  }

  try {
    const user = await auth.verifyIdToken(token);
    request.headers.set(UID_HEADER_FIELD, user.uid);
  } catch (error) {
    if (!(error instanceof FirebaseAuthError)) {
      return new InternalServerError('인증 검증 과정에서 알 수 없는 오류가 발생했습니다.').toResponse();
    }

    const firebaseServerErrorCodes = [
      FIREBASE_AUTH_ERROR.INTERNAL_ERROR,
      FIREBASE_AUTH_ERROR.NETWORK_REQUEST_FAILED,
      FIREBASE_AUTH_ERROR.TOO_MANY_REQUESTS,
    ];

    if (firebaseServerErrorCodes.includes(error.code)) {
      return new InternalServerError('Firebase 서버에 문제가 있습니다. 잠시 후 다시 시도해주세요.').toResponse();
    }
    return new UnauthorizedError('토큰이 유효하지 않습니다. 다시 로그인해주세요.').toResponse();
  }
  return next();
}

export async function emailVerifiedMiddleware(request: NextRequest, next: () => symbol) {
  const uid = request.headers.get(UID_HEADER_FIELD);

  if (!uid) {
    return new InternalServerError('인증 미들웨어에 문제가 있습니다. 개발자에게 문의해주세요.').toResponse();
  }
  const user = await auth.getUser(uid);

  if (user.emailVerified === false) {
    return new ForbiddenError('이메일 인증이 필요합니다.').toResponse();
  }

  return next();
}

export function getUserId(request: NextRequest) {
  const uid = request.headers.get(UID_HEADER_FIELD);
  if (!uid) {
    throw new InternalServerError('인증 미들웨어에 문제가 있습니다. 개발자에게 문의해주세요.');
  }
  return uid;
}
