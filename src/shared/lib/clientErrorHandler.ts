import { FirebaseError } from 'firebase/app';

import toast from '@/shared/lib/toast';
import { FIREBASE_AUTH_ERROR_MESSAGE, isManagedAuthErrorCode } from '@/shared/model/firebaseErrors';

export default function clientErrorHandler(error: unknown) {
  if (error instanceof FirebaseError) {
    if (isManagedAuthErrorCode(error.code)) {
      toast({ type: 'error', message: FIREBASE_AUTH_ERROR_MESSAGE[error.code] });
      return;
    }
  }
  console.error(error);
}
