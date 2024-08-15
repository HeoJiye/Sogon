import { NextRequest, NextResponse } from 'next/server';

export function handler(...middleware: Function[]) {
  return async function recursiveHandler(request: NextRequest): Promise<NextResponse> {
    const fn = middleware.shift();

    if (!fn) {
      throw new Error('Handler or middleware must return a NextResponse!');
    }
    if (middleware.length === 0) {
      return fn(request);
    }

    const symbol = Symbol('next');

    const next = () => symbol;

    const result = await fn(request, next);

    return result !== symbol ? result : recursiveHandler(request);
  };
}
