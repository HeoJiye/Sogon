import { type NextRequest, NextResponse } from 'next/server';

import { type EditProfileRequestDTO, editProfileRequestSchema } from '@/entities/user/model';
import { getProfile, updateProfile } from '@/entities/user/service';
import gatewayErrorHandler from '@/shard/lib/gatewayErrorHandler';
import {
  emailVerifiedMiddleware,
  getBody,
  getUserId,
  handler,
  tokenMiddleware,
  validateMiddleware,
} from '@/shard/lib/middleware';
import { ForbiddenError } from '@/shard/model/ApiErrors';

async function updateProfileGateway(request: NextRequest, { params }: { params: { uid: string } }) {
  try {
    const userId = getUserId(request);
    const body = getBody<EditProfileRequestDTO>(request);

    if (userId !== params.uid) {
      throw new ForbiddenError('해당 사용자의 프로필을 수정할 권한이 없습니다.');
    }
    return NextResponse.json(await updateProfile(userId, body), { status: 201 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

async function getProfileGateway(request: NextRequest, { params }: { params: { uid: string } }) {
  try {
    const curUserId = getUserId(request);
    const userId = params.uid;

    return NextResponse.json(await getProfile(curUserId, userId), { status: 200 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

export const PUT = handler(
  tokenMiddleware,
  emailVerifiedMiddleware,
  validateMiddleware(editProfileRequestSchema),
  updateProfileGateway
);

export const GET = handler(tokenMiddleware, emailVerifiedMiddleware, getProfileGateway);
