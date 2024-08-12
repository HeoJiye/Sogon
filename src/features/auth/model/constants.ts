export const EASY_STRINGS = ['1234', 'abcd', 'password', 'qwer', 'asdf', 'zxcv'];

export const VALIDATION_MESSAGES = {
  REQUIRED: '입력해주세요.',
  INVALID_EMAIL: '유효하지 않은 이메일 형식이에요.',
  MIN_LENGTH: (length: number) => `최소 ${length}글자 이상이어야 해요.`,
  STRONG_PASSWORD: '대/소문자, 숫자, 특수문자 중 3가지 이상을 포함',
  EASY_PASSWORD: '너무 쉬운 문자열이 포함되어 있어요.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않아요.',
};
