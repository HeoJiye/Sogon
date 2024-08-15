import { type NextRequest, NextResponse } from 'next/server';

import { auth } from '@/shard/lib/firebaseAdmin';
import { ForbiddenError, InternalServerError, UnauthorizedError } from '@/shard/model/errors/APIErrors';
import { FIREBASE_AUTH_ERROR, isFirebaseAuthError } from '@/shard/model/errors/firebaseErrors';

async function verifyToken(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return new UnauthorizedError('로그인이 필요합니다.').toResponse();
  }

  try {
    const user = await auth.verifyIdToken(token);
    request.cookies.set('x-uid', user.uid);
    return user;
  } catch (error) {
    if (!isFirebaseAuthError(error)) {
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
}

export async function tokenMiddlewareWithoutEmailVerified(request: NextRequest, next: () => symbol) {
  const user = await verifyToken(request);
  if (user instanceof NextResponse) {
    return user;
  }

  return next();
}

export async function tokenMiddleware(request: NextRequest, next: () => symbol) {
  const user = await verifyToken(request);
  if (user instanceof NextResponse) {
    return user;
  }

  const createUserAPI = request.method === 'POST' && request.nextUrl.pathname === '/api/users';
  if (!createUserAPI && user.email_verified === false) {
    return new ForbiddenError('이메일 인증이 필요합니다.').toResponse();
  }

  return next();
}
