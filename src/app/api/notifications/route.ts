import { type NextRequest, NextResponse } from 'next/server';

import { getNotifications } from '@/entities/notification/service';
import gatewayErrorHandler from '@/shard/lib/gatewayErrorHandler';
import { emailVerifiedMiddleware, getUserId, handler, tokenMiddleware } from '@/shard/lib/middleware';

async function getNotificationsGateway(request: NextRequest) {
  try {
    const userId = getUserId(request);
    return NextResponse.json(await getNotifications(userId), { status: 200 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

export const GET = handler(tokenMiddleware, emailVerifiedMiddleware, getNotificationsGateway);
