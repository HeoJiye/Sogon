import { NextRequest, NextResponse } from 'next/server';

import { createLike, deleteLike } from '@/features/like/service';
import gatewayErrorHandler from '@/shard/lib/gatewayErrorHandler';
import { emailVerifiedMiddleware, getUserId, handler, tokenMiddleware } from '@/shard/lib/middleware';

async function createLikeGateway(request: NextRequest, { params }: { params: { pid: string } }) {
  try {
    const userId = getUserId(request);
    const postId = params.pid;

    return NextResponse.json(await createLike(userId, postId), { status: 201 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

async function deleteLikeGateway(request: NextRequest, { params }: { params: { pid: string; cid: string } }) {
  try {
    const userId = getUserId(request);
    const postId = params.pid;

    await deleteLike(userId, postId);

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

export const POST = handler(tokenMiddleware, emailVerifiedMiddleware, createLikeGateway);

export const DELETE = handler(tokenMiddleware, emailVerifiedMiddleware, deleteLikeGateway);
