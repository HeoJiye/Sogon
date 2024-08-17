import { NextRequest, NextResponse } from 'next/server';

import { EditCommentRequestDTO, editCommentRequestSchema } from '@/features/comment/model';
import { deleteComment, updateComment } from '@/features/comment/service';
import gatewayErrorHandler from '@/shard/lib/gatewayErrorHandler';
import { emailVerifiedMiddleware, handler } from '@/shard/lib/middleware';
import { getUserId, tokenMiddleware } from '@/shard/lib/middleware.auth';
import { getBody, validateMiddleware } from '@/shard/lib/middleware.validate';

async function updateCommentGateway(request: NextRequest, { params }: { params: { pid: string; cid: string } }) {
  try {
    const userId = getUserId(request);
    const postId = params.pid;
    const commentId = params.cid;
    const body = getBody<EditCommentRequestDTO>(request);

    return NextResponse.json(await updateComment(userId, postId, commentId, body), { status: 200 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

async function deleteCommentGateway(request: NextRequest, { params }: { params: { pid: string; cid: string } }) {
  try {
    const userId = getUserId(request);
    const postId = params.pid;
    const commentId = params.cid;

    await deleteComment(userId, postId, commentId);

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return gatewayErrorHandler(error);
  }
}

export const PUT = handler(
  tokenMiddleware,
  emailVerifiedMiddleware,
  validateMiddleware(editCommentRequestSchema),
  updateCommentGateway
);
export const DELETE = handler(tokenMiddleware, emailVerifiedMiddleware, deleteCommentGateway);
