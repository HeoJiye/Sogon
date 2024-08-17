import { type NextRequest, NextResponse } from 'next/server';

import { EditPostRequestDTO, editPostRequestSchema } from '@/entities/post/model';
import { createPost, getAllPosts } from '@/entities/post/service';
import gatewayErrorHandler from '@/shard/lib/gatewayErrorHandler';
import {
  emailVerifiedMiddleware,
  getBody,
  getUserId,
  handler,
  tokenMiddleware,
  validateMiddleware,
} from '@/shard/lib/middleware';

async function getPostsGateway(request: NextRequest) {
  try {
    const userId = getUserId(request);
    return NextResponse.json(await getAllPosts(userId), { status: 200 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

async function createPostGateway(request: NextRequest) {
  try {
    const userId = getUserId(request);
    const body = getBody<EditPostRequestDTO>(request);

    return NextResponse.json(await createPost(userId, body), { status: 201 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

export const GET = handler(tokenMiddleware, emailVerifiedMiddleware, getPostsGateway);

export const POST = handler(
  tokenMiddleware,
  emailVerifiedMiddleware,
  validateMiddleware(editPostRequestSchema),
  createPostGateway
);
