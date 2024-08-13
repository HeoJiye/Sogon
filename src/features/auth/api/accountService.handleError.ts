import {
  ApiError,
  BadRequestError,
  ConflictError,
  InternalServerError,
  TooManyRequestsError,
  UnauthorizedError,
} from '@/shard/model/errors/APIErrors';
import { FIREBASE_AUTH_ERRORS, type FirebaseAuthErrorCode } from '@/shard/model/errors/firebaseAuthErrors';

import { API_AUTH_ERROR_MESSAGES } from '../model/constants';

export function handleCreateAccountError(error: unknown): ApiError {
  if (error instanceof Error && 'code' in error) {
    const errorCode = error.code as FirebaseAuthErrorCode;

    switch (errorCode) {
      case FIREBASE_AUTH_ERRORS.INVALID_EMAIL:
        return new BadRequestError(API_AUTH_ERROR_MESSAGES.INVALID_EMAIL);

      case FIREBASE_AUTH_ERRORS.INVALID_PASSWORD:
        return new BadRequestError(API_AUTH_ERROR_MESSAGES.INVALID_PASSWORD);

      case FIREBASE_AUTH_ERRORS.EMAIL_ALREADY_EXISTS:
        return new ConflictError(API_AUTH_ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);

      case FIREBASE_AUTH_ERRORS.INSUFFICIENT_PERMISSION:
        return new UnauthorizedError(API_AUTH_ERROR_MESSAGES.INSUFFICIENT_PERMISSION);

      case FIREBASE_AUTH_ERRORS.TOO_MANY_REQUESTS:
        return new TooManyRequestsError(API_AUTH_ERROR_MESSAGES.TOO_MANY_REQUESTS);

      case FIREBASE_AUTH_ERRORS.INTERNAL_ERROR:
        return new InternalServerError(API_AUTH_ERROR_MESSAGES.INTERNAL_ERROR);

      default:
        return new InternalServerError(API_AUTH_ERROR_MESSAGES.UNKNOWN_ERROR);
    }
  }

  return new InternalServerError(API_AUTH_ERROR_MESSAGES.UNKNOWN_ERROR);
}
export function handleDeleteAccountError(error: unknown): void {
  throw error;
}
