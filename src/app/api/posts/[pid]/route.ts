import { type NextRequest, NextResponse } from 'next/server';

import { EditPostRequestDTO, editPostRequestSchema } from '@/entities/post/model';
import { updatePost } from '@/entities/post/service';
import gatewayErrorHandler from '@/shard/lib/gatewayErrorHandler';
import {
  emailVerifiedMiddleware,
  getBody,
  getUserId,
  handler,
  tokenMiddleware,
  validateMiddleware,
} from '@/shard/lib/middleware';

async function updatePostGateway(request: NextRequest, { params }: { params: { pid: string } }) {
  try {
    const userId = getUserId(request);
    const postId = params.pid;
    const body = getBody<EditPostRequestDTO>(request);

    return NextResponse.json(await updatePost(userId, postId, body), { status: 200 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

export const PUT = handler(
  tokenMiddleware,
  emailVerifiedMiddleware,
  validateMiddleware(editPostRequestSchema),
  updatePostGateway
);
