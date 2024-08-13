import axios from 'axios';

import { AuthDTO } from '../model/dto';

export function createAccount({ email, password }: AuthDTO) {
  return axios.post('/api/auth/account', { email, password });
}

export function deleteAccount() {}
