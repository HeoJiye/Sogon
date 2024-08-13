export const EASY_STRINGS = ['1234', 'abcd', 'password', 'qwer', 'asdf', 'zxcv'] as const;

export const FORM_VALIDATION_MESSAGES = {
  REQUIRED: '입력해주세요.',
  INVALID_EMAIL: '유효하지 않은 이메일 형식이에요.',
  MIN_LENGTH: (length: number) => `최소 ${length}글자 이상이어야 해요.`,
  STRONG_PASSWORD: '대/소문자, 숫자, 특수문자 중 3가지 이상을 포함',
  EASY_PASSWORD: '너무 쉬운 문자열이 포함되어 있어요.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않아요.',
} as const;

export const API_AUTH_ERROR_MESSAGES = {
  INVALID_EMAIL: '유효하지 않은 이메일입니다.',
  INVALID_PASSWORD: '유효하지 않은 비밀번호입니다.',
  EMAIL_ALREADY_EXISTS: '이 이메일은 이미 사용 중입니다.',
  INSUFFICIENT_PERMISSION: '서버가 요청한 리소스에 대한 권한이 없습니다.',
  TOO_MANY_REQUESTS: '파이어베이스 서버에 요청이 너무 많습니다. 나중에 다시 시도하세요.',
  INTERNAL_ERROR: '파이어베이스 서버 내부 오류가 발생했습니다. 나중에 다시 시도하세요.',
  UNKNOWN_ERROR: '서버 내부에서 알 수 없는 오류가 발생했습니다.',
};
