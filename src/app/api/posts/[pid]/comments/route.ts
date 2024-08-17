import { NextRequest, NextResponse } from 'next/server';

import { EditCommentRequestDTO, editCommentRequestSchema } from '@/features/comment/model';
import { getComments } from '@/features/comment/service';
import { createComment } from '@/features/comment/service/createComment';
import gatewayErrorHandler from '@/shard/lib/gatewayErrorHandler';
import {
  emailVerifiedMiddleware,
  getBody,
  getUserId,
  handler,
  tokenMiddleware,
  validateMiddleware,
} from '@/shard/lib/middleware';

async function getCommentGateway(request: NextRequest, { params }: { params: { pid: string } }) {
  try {
    const userId = getUserId(request);
    const postId = params.pid;

    return NextResponse.json(await getComments(userId, postId), { status: 200 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

async function createCommentGateway(request: NextRequest, { params }: { params: { pid: string } }) {
  try {
    const userId = getUserId(request);
    const postId = params.pid;
    const body = getBody<EditCommentRequestDTO>(request);

    return NextResponse.json(await createComment(userId, postId, body), { status: 201 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

export const GET = handler(tokenMiddleware, emailVerifiedMiddleware, getCommentGateway);

export const POST = handler(
  tokenMiddleware,
  emailVerifiedMiddleware,
  validateMiddleware(editCommentRequestSchema),
  createCommentGateway
);
