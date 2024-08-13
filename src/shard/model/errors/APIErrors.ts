export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
  }
}

/* 400 Bad Request */
export class BadRequestError extends ApiError {
  constructor(message?: string) {
    super(message ?? 'Bad Request', 400);
  }
}

/* 401 Unauthorized */
export class UnauthorizedError extends ApiError {
  constructor(message?: string) {
    super(message ?? 'Unauthorized', 401);
  }
}

/* 403 Forbidden */
export class ForbiddenError extends ApiError {
  constructor(message?: string) {
    super(message ?? 'Forbidden', 403);
  }
}

/* 404 Not Found */
export class NotFoundError extends ApiError {
  constructor(message?: string) {
    super(message ?? 'Not Found', 404);
  }
}

/* 405 Method Not Allowed */
export class MethodNotAllowedError extends ApiError {
  constructor(message?: string) {
    super(message ?? 'Method Not Allowed', 405);
  }
}

/* 409 Conflict */
export class ConflictError extends ApiError {
  constructor(message?: string) {
    super(message ?? 'Conflict', 409);
  }
}

/* 418 I'm a teapot 😝 */
export class ImATeapotError extends ApiError {
  constructor(message?: string) {
    super(message ?? "I'm a teapot", 418);
  }
}

/* 500 Internal Server Error */
export class InternalServerError extends ApiError {
  constructor(message?: string) {
    super(message ?? 'Internal Server Error', 500);
  }
}

/* 501 Not Implemented */
export class NotImplementedError extends ApiError {
  constructor(message?: string) {
    super(message ?? 'Not Implemented', 501);
  }
}
