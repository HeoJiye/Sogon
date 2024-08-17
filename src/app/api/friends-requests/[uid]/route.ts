import { type NextRequest, NextResponse } from 'next/server';

import { SendFriendRequestDTO, sendFriendRequestSchema } from '@/features/friendRequest/model';
import { sendFriendRequest } from '@/features/friendRequest/service';
import gatewayErrorHandler from '@/shard/lib/gatewayErrorHandler';
import {
  emailVerifiedMiddleware,
  getBody,
  getUserId,
  handler,
  tokenMiddleware,
  validateMiddleware,
} from '@/shard/lib/middleware';

async function sendFriendRequestGateway(request: NextRequest, { params }: { params: { uid: string } }) {
  try {
    const senderId = getUserId(request);
    const receiverId = params.uid;
    const { message } = getBody<SendFriendRequestDTO>(request);

    return NextResponse.json(await sendFriendRequest(senderId, receiverId, message), { status: 201 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

export const POST = handler(
  tokenMiddleware,
  emailVerifiedMiddleware,
  validateMiddleware(sendFriendRequestSchema),
  sendFriendRequestGateway
);
