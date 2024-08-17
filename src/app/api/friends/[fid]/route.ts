import { type NextRequest, NextResponse } from 'next/server';

import { addFriend, removeFriend } from '@/features/friend/service';
import gatewayErrorHandler from '@/shard/lib/gatewayErrorHandler';
import { emailVerifiedMiddleware, getUserId, handler, tokenMiddleware } from '@/shard/lib/middleware';

async function addFriendGateway(request: NextRequest, { params }: { params: { fid: string } }) {
  try {
    const currentUserId = getUserId(request);
    const friendId = params.fid;

    return NextResponse.json(await addFriend(currentUserId, friendId), { status: 201 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

async function removeFriendGateway(request: NextRequest, { params }: { params: { fid: string } }) {
  try {
    const currentUserId = getUserId(request);
    const friendId = params.fid;

    await removeFriend(currentUserId, friendId);

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

export const POST = handler(tokenMiddleware, emailVerifiedMiddleware, addFriendGateway);

export const DELETE = handler(tokenMiddleware, emailVerifiedMiddleware, removeFriendGateway);
