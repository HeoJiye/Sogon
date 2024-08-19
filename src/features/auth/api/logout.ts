import clientErrorHandler from '@/shared/lib/clientErrorHandler';

import { sessionLogout } from './tokenManager';

export async function logout(): Promise<boolean> {
  try {
    await sessionLogout();
    return true;
  } catch (error) {
    clientErrorHandler(error);
    return false;
  }
}
