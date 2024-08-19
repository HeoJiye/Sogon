import { FirebaseAuthError } from 'firebase-admin/auth';
import type { NextRequest } from 'next/server';

import { auth } from '@/shared/lib/firebaseAdmin';
import { InternalServerError, UnauthorizedError } from '@/shared/model';

import { FIREBASE_ADMIN_AUTH_ERROR_MESSAGE, isManagedAdminAuthErrorCode } from '../model/firebaseAdminErrors';

export const UID_HEADER_FIELD = 'x-uid';

export async function tokenMiddleware(request: NextRequest, context: unknown, next: () => symbol) {
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

    if (isManagedAdminAuthErrorCode(error.code)) {
      return new UnauthorizedError(FIREBASE_ADMIN_AUTH_ERROR_MESSAGE[error.code]).toResponse();
    }

    return new InternalServerError('서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.').toResponse();
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
