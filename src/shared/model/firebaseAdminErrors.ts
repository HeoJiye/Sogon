const AuthErrorCodes = {
  AUTH_ID_TOKEN_EXPIRED: 'auth/id-token-expired',
  AUTH_ID_TOKEN_REVOKED: 'auth/id-token-revoked',
  AUTH_INVALID_ID_TOKEN: 'auth/invalid-id-token',
  AUTH_USER_NOT_FOUND: 'auth/user-not-found',
  AUTH_INVALID_EMAIL: 'auth/invalid-email',
  AUTH_TOO_MANY_REQUESTS: 'auth/too-many-requests',
  AUTH_SESSION_COOKIE_EXPIRED: 'auth/session-cookie-expired',
  AUTH_SESSION_COOKIE_REVOKED: 'auth/session-cookie-revoked',
} as const;

export const FIREBASE_ADMIN_AUTH_ERROR_MESSAGE = {
  [AuthErrorCodes.AUTH_ID_TOKEN_EXPIRED]: '세션이 만료되었습니다. 다시 로그인해 주세요.',
  [AuthErrorCodes.AUTH_ID_TOKEN_REVOKED]: '세션이 취소되었습니다. 다시 로그인해 주세요.',
  [AuthErrorCodes.AUTH_INVALID_ID_TOKEN]: '유효하지 않은 인증 토큰입니다. 다시 로그인해 주세요.',
  [AuthErrorCodes.AUTH_TOO_MANY_REQUESTS]: '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.',
  [AuthErrorCodes.AUTH_SESSION_COOKIE_EXPIRED]: '세션이 만료되었습니다. 다시 로그인해 주세요.',
  [AuthErrorCodes.AUTH_SESSION_COOKIE_REVOKED]: '세션이 취소되었습니다. 다시 로그인해 주세요.',
} as const;

export function isManagedAdminAuthErrorCode(code: string): code is keyof typeof FIREBASE_ADMIN_AUTH_ERROR_MESSAGE {
  return Object.keys(FIREBASE_ADMIN_AUTH_ERROR_MESSAGE).includes(code);
}
