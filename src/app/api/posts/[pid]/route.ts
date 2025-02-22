import { type NextRequest, NextResponse } from 'next/server';

import { EditPostRequestDTO, editPostRequestSchema } from '@/entities/post/model';
import { deletePost, updatePost } from '@/entities/post/service';
import { getPostDetails } from '@/entities/post/service/getPostDetail';
import gatewayErrorHandler from '@/shared/lib/gatewayErrorHandler';
import {
  emailVerifiedMiddleware,
  getBody,
  getUserId,
  handler,
  tokenMiddleware,
  validateMiddleware,
} from '@/shared/lib/middleware';

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

async function deletePostGateway(request: NextRequest, { params }: { params: { pid: string } }) {
  try {
    const userId = getUserId(request);
    const postId = params.pid;

    await deletePost(userId, postId);

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

async function getPostDetailsGateway(request: NextRequest, { params }: { params: { pid: string } }) {
  try {
    const userId = getUserId(request);
    const postId = params.pid;

    return NextResponse.json(await getPostDetails(userId, postId), { status: 200 });
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

export const DELETE = handler(tokenMiddleware, emailVerifiedMiddleware, deletePostGateway);

export const GET = handler(tokenMiddleware, emailVerifiedMiddleware, getPostDetailsGateway);
