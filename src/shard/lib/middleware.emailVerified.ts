import type { NextRequest } from 'next/server';

import { auth } from '@/shard/lib/firebaseAdmin';
import { ApiError, ForbiddenError, InternalServerError } from '@/shard/model';

import { getUserId } from './middleware.auth';

export async function emailVerifiedMiddleware(request: NextRequest, context: unknown, next: () => symbol) {
  try {
    const uid = getUserId(request);
    const user = await auth.getUser(uid);

    if (user.emailVerified === false) {
      return new ForbiddenError('이메일 인증이 필요합니다.').toResponse();
    }
    return next();
  } catch (error) {
    if (error instanceof ApiError) {
      return error.toResponse();
    }
    console.error('Unexpected error:', error);
    return new InternalServerError('서버에서 알 수 없는 오류가 발생했습니다.').toResponse();
  }
}
