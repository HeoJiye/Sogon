import { auth } from '@/shared/lib/firebase';

export function getCurUID(): string | undefined {
  return auth.currentUser?.uid;
}
