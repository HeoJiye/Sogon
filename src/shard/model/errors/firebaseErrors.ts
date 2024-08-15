import { FirebaseError } from 'firebase/app';

export * from './firebaseErrors.auth';

export function isFirebaseError(error: unknown): error is FirebaseError {
  return error instanceof FirebaseError;
}
