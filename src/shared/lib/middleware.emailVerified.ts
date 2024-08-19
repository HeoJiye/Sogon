import type { NextRequest } from 'next/server';

import { auth } from '@/shared/lib/firebaseAdmin';
import { ForbiddenError } from '@/shared/model';

import gatewayErrorHandler from './gatewayErrorHandler';
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
    return gatewayErrorHandler(error);
  }
}
