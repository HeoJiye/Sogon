/* eslint-disable no-await-in-loop */

/* eslint-disable no-restricted-syntax */
import { NextRequest } from 'next/server';

import { NextAPIContext } from '../model/type';

export * from './middleware.auth';
export * from './middleware.validate';

export function handler(...middleware: Function[]) {
  return async (request: NextRequest, context: NextAPIContext) => {
    let result;

    for (const fn of middleware) {
      const symbol = Symbol('next');

      const next = () => symbol;

      result = await fn(request, context, next);
      if (result !== symbol) {
        break;
      }
    }

    if (result) {
      return result;
    }
    throw new Error('Handler or middleware must return a NextResponse!');
  };
}
