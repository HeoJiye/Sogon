export const FIREBASE_AUTH_ERRORS = {
  // setCustomUserClaims()에 제공된 클레임 페이로드가 최대 허용 크기인 1,000바이트를 초과합니다.
  CLAIMS_TOO_LARGE: 'auth/claims-too-large',

  // 제공된 이메일을 기존 사용자가 이미 사용 중입니다. 각 사용자마다 이메일이 고유해야 합니다.
  EMAIL_ALREADY_EXISTS: 'auth/email-already-exists',

  // 제공된 Firebase ID 토큰이 만료되었습니다.
  ID_TOKEN_EXPIRED: 'auth/id-token-expired',

  // Firebase ID 토큰이 취소되었습니다.
  ID_TOKEN_REVOKED: 'auth/id-token-revoked',

  // Admin SDK 초기화에 사용된 사용자 인증 정보에는 요청한 인증 리소스에 액세스할 권한이 없습니다.
  INSUFFICIENT_PERMISSION: 'auth/insufficient-permission',

  // 인증 서버에서 요청을 처리하려고 시도하는 중에 예기치 않은 오류가 발생했습니다.
  INTERNAL_ERROR: 'auth/internal-error',

  // 인증 메서드에 잘못된 인수가 제공되었습니다.
  INVALID_ARGUMENT: 'auth/invalid-argument',

  // setCustomUserClaims()에 제공된 커스텀 클레임 속성이 잘못되었습니다.
  INVALID_CLAIMS: 'auth/invalid-claims',

  // 연결 URL은 올바른 URL 문자열이어야 합니다.
  INVALID_CONTINUE_URI: 'auth/invalid-continue-uri',

  // 생성 시간이 올바른 UTC 날짜 문자열이어야 합니다.
  INVALID_CREATION_TIME: 'auth/invalid-creation-time',

  // Admin SDK 인증에 사용된 사용자 인증 정보로는 원하는 작업을 수행할 수 없습니다.
  INVALID_CREDENTIAL: 'auth/invalid-credential',

  // disabled 사용자 속성에 제공된 값이 잘못되었습니다. 이 값은 부울이어야 합니다.
  INVALID_DISABLED_FIELD: 'auth/invalid-disabled-field',

  // displayName 사용자 속성에 제공된 값이 잘못되었습니다. 이 값은 비어 있지 않은 문자열이어야 합니다.
  INVALID_DISPLAY_NAME: 'auth/invalid-display-name',

  // 제공된 동적 링크 도메인이 구성되지 않거나 현재 프로젝트에 대해 승인되지 않았습니다.
  INVALID_DYNAMIC_LINK_DOMAIN: 'auth/invalid-dynamic-link-domain',

  // email 사용자 속성에 제공된 값이 잘못되었습니다. 이 값은 문자열 이메일 주소여야 합니다.
  INVALID_EMAIL: 'auth/invalid-email',

  // emailVerified 사용자 속성에 제공된 값이 잘못되었습니다. 이 값은 부울이어야 합니다.
  INVALID_EMAIL_VERIFIED: 'auth/invalid-email-verified',

  // 해시 알고리즘이 지원되는 알고리즘 목록의 문자열 중 하나와 일치해야 합니다.
  INVALID_HASH_ALGORITHM: 'auth/invalid-hash-algorithm',

  // 해시 블록 크기가 올바른 숫자여야 합니다.
  INVALID_HASH_BLOCK_SIZE: 'auth/invalid-hash-block-size',

  // 해시에서 파생된 키 길이가 올바른 숫자여야 합니다.
  INVALID_HASH_DERIVED_KEY_LENGTH: 'auth/invalid-hash-derived-key-length',

  // 해시 키가 올바른 바이트 버퍼여야 합니다.
  INVALID_HASH_KEY: 'auth/invalid-hash-key',

  // 해시 메모리 비용이 올바른 숫자여야 합니다.
  INVALID_HASH_MEMORY_COST: 'auth/invalid-hash-memory-cost',

  // 해시 병렬 처리가 올바른 숫자여야 합니다.
  INVALID_HASH_PARALLELIZATION: 'auth/invalid-hash-parallelization',

  // 해시 라운드가 올바른 숫자여야 합니다.
  INVALID_HASH_ROUNDS: 'auth/invalid-hash-rounds',

  // 해싱 알고리즘 솔트 구분자 필드가 올바른 바이트 버퍼여야 합니다.
  INVALID_HASH_SALT_SEPARATOR: 'auth/invalid-hash-salt-separator',

  // 제공된 ID 토큰이 올바른 Firebase ID 토큰이 아닙니다.
  INVALID_ID_TOKEN: 'auth/invalid-id-token',

  // 마지막 로그인 시간이 올바른 UTC 날짜 문자열이어야 합니다.
  INVALID_LAST_SIGN_IN_TIME: 'auth/invalid-last-sign-in-time',

  // listUsers()에 제공된 다음 페이지 토큰이 잘못되었습니다. 비어 있지 않은 유효한 문자열이어야 합니다.
  INVALID_PAGE_TOKEN: 'auth/invalid-page-token',

  // password 사용자 속성에 제공된 값이 잘못되었습니다. 이 값은 6자 이상의 문자열이어야 합니다.
  INVALID_PASSWORD: 'auth/invalid-password',

  // 비밀번호 해시가 올바른 바이트 버퍼여야 합니다.
  INVALID_PASSWORD_HASH: 'auth/invalid-password-hash',

  // 비밀번호 솔트가 올바른 바이트 버퍼여야 합니다.
  INVALID_PASSWORD_SALT: 'auth/invalid-password-salt',

  // phoneNumber에 제공된 값이 잘못되었습니다. 이 값은 E.164 표준과 호환되는 비어 있지 않은 식별자 문자열이어야 합니다.
  INVALID_PHONE_NUMBER: 'auth/invalid-phone-number',

  // photoURL 사용자 속성에 제공된 값이 잘못되었습니다. 이 값은 문자열 URL이어야 합니다.
  INVALID_PHOTO_URL: 'auth/invalid-photo-url',

  // providerData가 올바른 UserInfo 객체 배열이어야 합니다.
  INVALID_PROVIDER_DATA: 'auth/invalid-provider-data',

  // providerId가 지원되는 올바른 제공업체 식별자 문자열이어야 합니다.
  INVALID_PROVIDER_ID: 'auth/invalid-provider-id',

  // 정확히 하나의 OAuth responseType만 true로 설정해야 합니다.
  INVALID_OAUTH_RESPONSE_TYPE: 'auth/invalid-oauth-responsetype',

  // 세션 쿠키 기간이 5분에서 2주 사이의 올바른 밀리초 단위 숫자여야 합니다.
  INVALID_SESSION_COOKIE_DURATION: 'auth/invalid-session-cookie-duration',

  // 제공된 uid는 128자(영문 기준) 이하의 비어 있지 않은 문자열이어야 합니다.
  INVALID_UID: 'auth/invalid-uid',

  // 가져올 사용자 레코드가 잘못되었습니다.
  INVALID_USER_IMPORT: 'auth/invalid-user-import',

  // 가져올 수 있는 최대 사용자 수를 초과했습니다.
  MAXIMUM_USER_COUNT_EXCEEDED: 'auth/maximum-user-count-exceeded',

  // Android 앱을 설치해야 할 경우 Android 패키지 이름을 제공해야 합니다.
  MISSING_ANDROID_PKG_NAME: 'auth/missing-android-pkg-name',

  // 요청에 올바른 연결 URL을 제공해야 합니다.
  MISSING_CONTINUE_URI: 'auth/missing-continue-uri',

  // 비밀번호 해시를 사용해 사용자를 가져오려면 해싱 알고리즘 및 매개변수를 제공해야 합니다.
  MISSING_HASH_ALGORITHM: 'auth/missing-hash-algorithm',

  // 요청에 번들 ID가 누락되었습니다.
  MISSING_IOS_BUNDLE_ID: 'auth/missing-ios-bundle-id',

  // 현재 작업에 uid 식별자가 필요합니다.
  MISSING_UID: 'auth/missing-uid',

  // OIDC 코드 흐름을 사용 설정하려면 OAuth 구성 클라이언트 비밀번호가 필요합니다.
  MISSING_OAUTH_CLIENT_SECRET: 'auth/missing-oauth-client-secret',

  // 제공된 로그인 제공업체가 Firebase 프로젝트에서 사용 중지되었습니다. Firebase Console의 로그인 방법 섹션에서 사용 설정하세요.
  OPERATION_NOT_ALLOWED: 'auth/operation-not-allowed',

  // 제공된 phoneNumber을 기존 사용자가 이미 사용 중입니다. 사용자마다 phoneNumber가 고유해야 합니다.
  PHONE_NUMBER_ALREADY_EXISTS: 'auth/phone-number-already-exists',

  // Admin SDK를 초기화하는 데 사용한 사용자 인증 정보에 해당하는 Firebase 프로젝트가 없습니다.
  PROJECT_NOT_FOUND: 'auth/project-not-found',

  // setCustomUserClaims()에 제공된 하나 이상의 커스텀 사용자 클레임이 예약되어 있습니다.
  RESERVED_CLAIMS: 'auth/reserved-claims',

  // 제공된 Firebase 세션 쿠키가 만료되었습니다.
  SESSION_COOKIE_EXPIRED: 'auth/session-cookie-expired',

  // Firebase 세션 쿠키가 취소되었습니다.
  SESSION_COOKIE_REVOKED: 'auth/session-cookie-revoked',

  // 요청 수가 최대 허용치를 초과합니다.
  TOO_MANY_REQUESTS: 'auth/too-many-requests',

  // 제공된 uid를 기존 사용자가 이미 사용하고 있습니다. 각 사용자마다 uid가 고유해야 합니다.
  UID_ALREADY_EXISTS: 'auth/uid-already-exists',

  // 연결 URL의 도메인이 허용 목록에 포함되어 있지 않습니다.
  UNAUTHORIZED_CONTINUE_URI: 'auth/unauthorized-continue-uri',

  // 제공된 식별자에 해당하는 기존 사용자 레코드가 없습니다.
  USER_NOT_FOUND: 'auth/user-not-found',
} as const;

export type FirebaseAuthErrorCode = (typeof FIREBASE_AUTH_ERRORS)[keyof typeof FIREBASE_AUTH_ERRORS];
