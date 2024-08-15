import { NextRequest } from 'next/server';
import { ZodObject, ZodRawShape } from 'zod';

import { BadRequestError } from '../model/errors/APIErrors';

export function validateMiddleware<T extends ZodRawShape>(schema: ZodObject<T>) {
  return async (request: NextRequest, next: () => symbol) => {
    const result = schema.safeParse(await request.json());

    if (!result.success) {
      return new BadRequestError('request body의 형식이 유효하지 않습니다.').toResponse();
    }
    return next();
  };
}
