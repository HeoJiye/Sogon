import { errorHandler } from './errorHandler';
import { sessionLogout } from './tokenManager';

export async function logout(): Promise<boolean> {
  try {
    await sessionLogout();
    return true;
  } catch (error) {
    errorHandler(error);
    return false;
  }
}
