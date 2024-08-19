import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

import clientErrorHandler from '@/shared/lib/clientErrorHandler';
import { auth } from '@/shared/lib/firebase';

import type { AuthDTO } from '../model';
import { sessionLogin } from './tokenManager';

export async function signup({ email, password }: AuthDTO): Promise<boolean> {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await sessionLogin(user);
    sendEmailVerification(user);
    return true;
  } catch (error) {
    clientErrorHandler(error);
    return false;
  }
}
