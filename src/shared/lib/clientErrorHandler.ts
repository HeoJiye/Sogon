import { FirebaseError } from 'firebase/app';

import alert from '@/shared/lib/alert';
import { FIREBASE_AUTH_ERROR_MESSAGE, isManagedAuthErrorCode } from '@/shared/model/firebaseErrors';

export default function clientErrorHandler(error: unknown) {
  if (error instanceof FirebaseError) {
    if (isManagedAuthErrorCode(error.code)) {
      alert({ type: 'error', message: FIREBASE_AUTH_ERROR_MESSAGE[error.code] });
      return;
    }
  }
  console.error(error);
}
