import { type NextRequest, NextResponse } from 'next/server';

import { type EditProfileRequestDTO, editProfileRequestSchema } from '@/entities/user/model';
import { createProfile } from '@/entities/user/service';
import gatewayErrorHandler from '@/shard/lib/gatewayErrorHandler';
import { getBody, getUserId, handler, tokenMiddleware, validateMiddleware } from '@/shard/lib/middleware';

async function createProfileGateway(request: NextRequest) {
  try {
    const userId = getUserId(request);
    const body = getBody<EditProfileRequestDTO>(request);

    return NextResponse.json(await createProfile(userId, body), { status: 201 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

export const POST = handler(tokenMiddleware, validateMiddleware(editProfileRequestSchema), createProfileGateway);
