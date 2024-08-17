import { type NextRequest, NextResponse } from 'next/server';

import { getFriends } from '@/features/friend/service';
import gatewayErrorHandler from '@/shard/lib/gatewayErrorHandler';
import { emailVerifiedMiddleware, getUserId, handler, tokenMiddleware } from '@/shard/lib/middleware';

async function getFriendsGateway(request: NextRequest, { params }: { params: { uid: string } }) {
  try {
    const currentUserId = getUserId(request);
    const userId = params.uid;

    return NextResponse.json(await getFriends(currentUserId, userId), { status: 200 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

export const GET = handler(tokenMiddleware, emailVerifiedMiddleware, getFriendsGateway);
