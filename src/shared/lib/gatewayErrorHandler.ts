import { NextResponse } from 'next/server';

import { ApiError, InternalServerError } from '../model/ApiErrors';

export default function gatewayErrorHandler(error: unknown): NextResponse {
  if (error instanceof ApiError) {
    return error.toResponse();
  }
  console.error('Unexpected error:', error);
  return new InternalServerError('서버에서 알 수 없는 오류가 발생했습니다.').toResponse();
}
