import { type NextRequest, NextResponse } from 'next/server';

import { getAllPosts } from '@/entities/post/service';
import gatewayErrorHandler from '@/shard/lib/gatewayErrorHandler';
import { emailVerifiedMiddleware, getUserId, handler, tokenMiddleware } from '@/shard/lib/middleware';

async function getPostsGateway(request: NextRequest) {
  try {
    const userId = getUserId(request);
    return NextResponse.json(await getAllPosts(userId), { status: 200 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

export const GET = handler(tokenMiddleware, emailVerifiedMiddleware, getPostsGateway);
