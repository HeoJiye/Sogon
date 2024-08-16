import { type NextRequest, NextResponse } from 'next/server';

import { addFriend } from '@/features/friend/service';
import gatewayErrorHandler from '@/shard/lib/gatewayErrorHandler';
import { emailVerifiedMiddleware, getUserId, handler, tokenMiddleware } from '@/shard/lib/middleware';

async function addFriendGateway(request: NextRequest, { params }: { params: { uid: string } }) {
  try {
    const currentUserId = getUserId(request);
    const friendId = params.uid;

    return NextResponse.json(await addFriend(currentUserId, friendId), { status: 201 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

export const POST = handler(tokenMiddleware, emailVerifiedMiddleware, addFriendGateway);
