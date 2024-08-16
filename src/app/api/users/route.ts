import { type NextRequest, NextResponse } from 'next/server';

import { createProfile } from '@/entities/user/lib/service';
import { type EditProfileRequestDTO, editProfileRequestSchema } from '@/entities/user/model';
import { getBody, getUserId, handler, tokenMiddleware, validateMiddleware } from '@/shard/lib/middleware';
import { ApiError, InternalServerError } from '@/shard/model/errors/APIErrors';

async function createProfileGateway(request: NextRequest) {
  try {
    const userId = getUserId(request);
    const body = getBody<EditProfileRequestDTO>(request);

    return NextResponse.json(await createProfile(userId, body), { status: 201 });
  } catch (error) {
    if (error instanceof ApiError) {
      return error.toResponse();
    }
    console.error('Unexpected error:', error);
    return new InternalServerError('서버에서 알 수 없는 오류가 발생했습니다.').toResponse();
  }
}

export const POST = handler(tokenMiddleware, validateMiddleware(editProfileRequestSchema), createProfileGateway);
