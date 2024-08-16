import { NextRequest } from 'next/server';
import { ZodObject, ZodRawShape } from 'zod';

import { BadRequestError, InternalServerError } from '../model';

export const VALIDATED_BODY_HEADER_FIELD = 'validated-body';

export function validateMiddleware<T extends ZodRawShape>(schema: ZodObject<T>) {
  return async (request: NextRequest, context: unknown, next: () => symbol) => {
    const result = schema.safeParse(await request.json());

    if (!result.success) {
      return new BadRequestError('request body의 형식이 유효하지 않습니다.').toResponse();
    }
    request.headers.set(VALIDATED_BODY_HEADER_FIELD, JSON.stringify(result.data));

    return next();
  };
}

export function getBody<T>(request: NextRequest): T {
  const body = request.headers.get(VALIDATED_BODY_HEADER_FIELD);
  if (!body) {
    throw new InternalServerError('body 검증 미들웨어에 문제가 있습니다. 개발자에게 문의해주세요.');
  }
  return JSON.parse(body) satisfies T;
}
