import { AuthErrorCodes } from 'firebase/auth';

export const FIREBASE_AUTH_ERROR_MESSAGE = {
  [AuthErrorCodes.EMAIL_EXISTS]: '이미 사용 중인 이메일 주소입니다. 다른 이메일을 사용해 주세요.',
  [AuthErrorCodes.INVALID_EMAIL]: '이메일 또는 비밀번호가 올바르지 않아요. 다시 확인해주세요.',
  [AuthErrorCodes.INVALID_PASSWORD]: '이메일 또는 비밀번호가 올바르지 않아요. 다시 확인해주세요.',
  [AuthErrorCodes.USER_DISABLED]: '해당 계정은 비활성화되었습니다. 관리자에게 문의해 주세요.',
  [AuthErrorCodes.USER_DELETED]: '해당 이메일로 등록된 계정을 찾을 수 없습니다. 다시 확인해 주세요.',
  [AuthErrorCodes.WEAK_PASSWORD]: '비밀번호가 너무 약합니다. 더 강력한 비밀번호를 사용해 주세요.',
  [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]: '시도 횟수가 너무 많습니다. 나중에 다시 시도해 주세요.',
  [AuthErrorCodes.INVALID_CODE]: '잘못된 인증 코드입니다. 다시 확인해 주세요.',
  [AuthErrorCodes.INVALID_PHONE_NUMBER]: '유효하지 않은 전화번호입니다. 번호를 다시 확인해 주세요.',
  [AuthErrorCodes.CREDENTIAL_ALREADY_IN_USE]: '이 자격 증명은 이미 다른 계정과 연결되어 있습니다.',
  [AuthErrorCodes.OPERATION_NOT_ALLOWED]: '이 작업은 허용되지 않습니다. 관리자에게 문의해 주세요.',
  [AuthErrorCodes.NETWORK_REQUEST_FAILED]: '네트워크 오류가 발생했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
  [AuthErrorCodes.CAPTCHA_CHECK_FAILED]: '보안 확인에 실패했습니다. 다시 시도해 주세요.',
  [AuthErrorCodes.TOKEN_EXPIRED]: '유효하지 않거나 만료된 코드입니다. 다시 시도해 주세요.',
  [AuthErrorCodes.UNVERIFIED_EMAIL]: '이메일이 확인되지 않았습니다. 이메일을 확인하고 인증을 완료해 주세요.',
  [AuthErrorCodes.MFA_REQUIRED]: '추가 인증이 필요합니다. 지침에 따라 인증을 완료해 주세요.',
} as const;

export function isManagedAuthErrorCode(code: string): code is keyof typeof FIREBASE_AUTH_ERROR_MESSAGE {
  return Object.keys(FIREBASE_AUTH_ERROR_MESSAGE).includes(code);
}
