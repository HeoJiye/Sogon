import { ApiError } from 'next/dist/server/api-utils';

import {
  BadRequestError,
  ConflictError,
  InternalServerError,
  TooManyRequestsError,
  UnauthorizedError,
} from '@/shard/model/errors/APIErrors';
import { FIREBASE_AUTH_ERRORS, type FirebaseAuthErrorCode } from '@/shard/model/errors/firebaseAuthErrors';

export function handleCreateAccountError(error: unknown): ApiError {
  if (error instanceof Error && 'code' in error) {
    const errorCode = error.code as FirebaseAuthErrorCode;

    switch (errorCode) {
      case FIREBASE_AUTH_ERRORS.INVALID_EMAIL:
        return new BadRequestError('유효하지 않은 이메일입니다.');

      case FIREBASE_AUTH_ERRORS.INVALID_PASSWORD:
        return new BadRequestError('유효하지 않은 비밀번호입니다.');

      case FIREBASE_AUTH_ERRORS.EMAIL_ALREADY_EXISTS:
        return new ConflictError('이 이메일은 이미 사용 중입니다.');

      case FIREBASE_AUTH_ERRORS.INSUFFICIENT_PERMISSION:
        return new UnauthorizedError('서버가 요청한 리소스에 대한 권한이 없습니다.');

      case FIREBASE_AUTH_ERRORS.TOO_MANY_REQUESTS:
        return new TooManyRequestsError('파이어베이스 서버에 요청이 너무 많습니다. 나중에 다시 시도하세요.');

      case FIREBASE_AUTH_ERRORS.INTERNAL_ERROR:
        return new InternalServerError('파이어베이스 서버 내부 오류가 발생했습니다. 나중에 다시 시도하세요.');

      default:
    }
  }
  return new InternalServerError('계정을 생성하는 중에 알 수 없는 오류가 발생했습니다.');
}

export function handleDeleteAccountError(error: unknown): void {
  throw error;
}
