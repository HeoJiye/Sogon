export const FIREBASE_AUTH_ERROR = {
  EMAIL_ALREADY_IN_USE: 'auth/email-already-in-use',
  INVALID_EMAIL: 'auth/invalid-email',
  WEAK_PASSWORD: 'auth/weak-password',

  INVALID_CREDENTIAL: 'auth/invalid-credential',
  USER_NOT_FOUND: 'auth/user-not-found',
  WRONG_PASSWORD: 'auth/wrong-password',
  USER_DISABLED: 'auth/user-disabled',

  INTERNAL_ERROR: 'auth/internal-error',
  NETWORK_REQUEST_FAILED: 'auth/network-request-failed',
  TOO_MANY_REQUESTS: 'auth/too-many-requests',
  USER_TOKEN_EXPIRED: 'auth/user-token-expired',
  INVALID_USER_TOKEN: 'auth/invalid-user-token',
  INVALID_ID_TOKEN: 'auth/invalid-id-token',
};

export const FIREBASE_AUTH_ERROR_MESSAGE = {
  [FIREBASE_AUTH_ERROR.EMAIL_ALREADY_IN_USE]: '이미 사용 중인 이메일 주소입니다. 다른 이메일을 사용해 주세요.',
  [FIREBASE_AUTH_ERROR.INVALID_EMAIL]: '유효하지 않은 이메일 주소입니다. 이메일 주소를 확인해 주세요.',
  [FIREBASE_AUTH_ERROR.WEAK_PASSWORD]: '비밀번호가 너무 약합니다. 더 강력한 비밀번호를 사용해 주세요.',

  [FIREBASE_AUTH_ERROR.INVALID_CREDENTIAL]: '잘못된 인증 정보입니다. 다시 확인해 주세요.',
  [FIREBASE_AUTH_ERROR.USER_NOT_FOUND]: '이메일 또는 비밀번호가 올바르지 않아요. 다시 확인해주세요.',
  [FIREBASE_AUTH_ERROR.WRONG_PASSWORD]: '이메일 또는 비밀번호가 올바르지 않아요. 다시 확인해주세요.',
  [FIREBASE_AUTH_ERROR.USER_DISABLED]: '이 계정은 비활성화되었습니다. 개발자에게 문의해 주세요.',

  [FIREBASE_AUTH_ERROR.INTERNAL_ERROR]: '서버에서 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
  [FIREBASE_AUTH_ERROR.NETWORK_REQUEST_FAILED]: '네트워크 요청에 실패했습니다. 인터넷 연결을 확인해 주세요.',
  [FIREBASE_AUTH_ERROR.TOO_MANY_REQUESTS]: '짧은 시간 내에 너무 많은 시도가 있었습니다. 잠시 후 다시 시도해 주세요.',
  [FIREBASE_AUTH_ERROR.USER_TOKEN_EXPIRED]: '로그인 세션이 만료되었습니다. 다시 로그인해 주세요.',
  [FIREBASE_AUTH_ERROR.INVALID_USER_TOKEN]: '유효하지 않은 인증 정보입니다. 다시 로그인해 주세요.',
  [FIREBASE_AUTH_ERROR.INVALID_ID_TOKEN]: '유효하지 않은 인증 정보입니다. 다시 로그인해 주세요.',
};
