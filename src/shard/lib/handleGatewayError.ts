import { z } from 'zod';

import { ApiError, BadRequestError, InternalServerError } from '../model/errors/APIErrors';

export default function handleGatewayError(error: unknown): ApiError {
  console.error('handleGatewayError:', error);

  if (error instanceof z.ZodError) {
    return new BadRequestError('잘못된 입력입니다.');
  }
  if (error instanceof ApiError) {
    return error;
  }
  return new InternalServerError('서버 내부에서 알 수 없는 오류가 발생했습니다.');
}
