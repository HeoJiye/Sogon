/* eslint-disable no-await-in-loop */

/* eslint-disable no-restricted-syntax */
import { NextRequest } from 'next/server';

export * from './middleware.auth';
export * from './middleware.validate';

export function handler(...middleware: Function[]) {
  return async (request: NextRequest) => {
    let result;

    for (const fn of middleware) {
      const symbol = Symbol('next');

      const next = () => symbol;

      result = await fn(request, next);
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
