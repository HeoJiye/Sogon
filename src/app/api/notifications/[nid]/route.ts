import { type NextRequest, NextResponse } from 'next/server';

import { updateNotificationStatus } from '@/entities/notification/service';
import gatewayErrorHandler from '@/shared/lib/gatewayErrorHandler';
import { emailVerifiedMiddleware, getUserId, handler, tokenMiddleware } from '@/shared/lib/middleware';

async function updateNotificationGateway(request: NextRequest, { params }: { params: { nid: string } }) {
  try {
    const userId = getUserId(request);
    const notificationId = params.nid;

    return NextResponse.json(await updateNotificationStatus(userId, notificationId), { status: 200 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

export const PUT = handler(tokenMiddleware, emailVerifiedMiddleware, updateNotificationGateway);
