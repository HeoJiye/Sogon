import { deleteUser } from 'firebase/auth';

import clientErrorHandler from '@/shared/lib/clientErrorHandler';
import { auth } from '@/shared/lib/firebase';

export async function signupCancel(): Promise<boolean> {
  try {
    const user = auth.currentUser;

    if (user) {
      await deleteUser(user);
      return true;
    }
    return false;
  } catch (error) {
    clientErrorHandler(error);
    return false;
  }
}
