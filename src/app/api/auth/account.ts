import { NextApiRequest, NextApiResponse } from 'next';

import { createAccount } from '@/features/auth/api/accountService';
import { authDTOVaildation } from '@/features/auth/model/dto';
import handleGatewayError from '@/shard/lib/handleGatewayError';
import { MethodNotAllowedError, NotImplementedError } from '@/shard/model/errors/APIErrors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;

    switch (method) {
      case 'POST':
        {
          const authData = authDTOVaildation.parse(req.body);
          const userRecord = await createAccount(authData);

          res.status(201).json({ uid: userRecord.uid });
        }
        break;
      case 'DELETE':
        throw new NotImplementedError();
        break;
      default:
        res.setHeader('Allow', ['POST', 'DELETE']);
        throw new MethodNotAllowedError();
    }
  } catch (error) {
    const e = handleGatewayError(error);
    res.status(e.statusCode).json({ message: e.message });
  }
}
