/* eslint-disable no-await-in-loop */

/* eslint-disable no-restricted-syntax */
import { NextRequest } from 'next/server';

export * from './middleware.auth';
export * from './middleware.emailVerified';
export * from './middleware.validate';

export type NextAPIContext = {
  params?: Record<string, string>;
  searchParams?: URLSearchParams;
};

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
