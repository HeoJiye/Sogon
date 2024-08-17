import { type NextRequest, NextResponse } from 'next/server';

import { getPendingFriendRequests } from '@/features/friendRequest/service';
import gatewayErrorHandler from '@/shard/lib/gatewayErrorHandler';
import { emailVerifiedMiddleware, getUserId, handler, tokenMiddleware } from '@/shard/lib/middleware';

async function getPendingFriendRequestsGateway(request: NextRequest) {
  try {
    const userId = getUserId(request);
    return NextResponse.json(await getPendingFriendRequests(userId), { status: 200 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

export const GET = handler(tokenMiddleware, emailVerifiedMiddleware, getPendingFriendRequestsGateway);
