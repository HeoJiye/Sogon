import { type NextRequest, NextResponse } from 'next/server';

import { getUserPosts } from '@/entities/post/service';
import { isFriend } from '@/features/friend/service';
import gatewayErrorHandler from '@/shard/lib/gatewayErrorHandler';
import { emailVerifiedMiddleware, getUserId, handler, tokenMiddleware } from '@/shard/lib/middleware';
import { ForbiddenError } from '@/shard/model';

async function getUserPostsGateway(request: NextRequest, { params }: { params: { uid: string } }) {
  try {
    const curUserId = getUserId(request);
    const userId = params.uid;

    if (curUserId !== userId && !(await isFriend(curUserId, userId))) {
      throw new ForbiddenError('게시글을 조회할 수 있는 권한이 없습니다.');
    }
    return NextResponse.json(await getUserPosts(userId), { status: 200 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

export const GET = handler(tokenMiddleware, emailVerifiedMiddleware, getUserPostsGateway);
