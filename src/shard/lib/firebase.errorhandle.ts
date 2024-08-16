import { FirebaseError } from 'firebase/app';

import { FIREBASE_AUTH_ERROR_MESSAGE } from '../model/errors/firebaseErrors';
import alert from './alert';

function handleFirebaseAuthError(error: unknown) {
  const message =
    error instanceof FirebaseError
      ? FIREBASE_AUTH_ERROR_MESSAGE[error.code as keyof typeof FIREBASE_AUTH_ERROR_MESSAGE]
      : '알 수 없는 오류가 발생했어요. 다시 시도해주세요.';

  alert({ type: 'error', message });
}

export default handleFirebaseAuthError;
