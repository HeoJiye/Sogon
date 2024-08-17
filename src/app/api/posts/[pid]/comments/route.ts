import { NextRequest, NextResponse } from 'next/server';

import { getComments } from '@/features/comment/service';
import gatewayErrorHandler from '@/shard/lib/gatewayErrorHandler';
import { emailVerifiedMiddleware, getUserId, handler, tokenMiddleware } from '@/shard/lib/middleware';

async function getCommentGateway(request: NextRequest, { params }: { params: { pid: string } }) {
  try {
    const userId = getUserId(request);
    const postId = params.pid;

    return NextResponse.json(await getComments(userId, postId), { status: 200 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

export const GET = handler(tokenMiddleware, emailVerifiedMiddleware, getCommentGateway);
