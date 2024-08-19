import { NextRequest, NextResponse } from 'next/server';

import { createLike, deleteLike, getLikedUsers } from '@/features/like/service';
import gatewayErrorHandler from '@/shared/lib/gatewayErrorHandler';
import { emailVerifiedMiddleware, getUserId, handler, tokenMiddleware } from '@/shared/lib/middleware';

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

async function getLikedUsersGateway(request: NextRequest, { params }: { params: { pid: string } }) {
  try {
    const userId = getUserId(request);
    const postId = params.pid;

    return NextResponse.json(await getLikedUsers(userId, postId), { status: 200 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

export const POST = handler(tokenMiddleware, emailVerifiedMiddleware, createLikeGateway);

export const DELETE = handler(tokenMiddleware, emailVerifiedMiddleware, deleteLikeGateway);

export const GET = handler(tokenMiddleware, emailVerifiedMiddleware, getLikedUsersGateway);
