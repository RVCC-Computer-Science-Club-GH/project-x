import type { Request, Response, NextFunction } from 'express';

/**
 * Application error class for consistent error handling.
 * Extends Error with HTTP status code, error code, and optional details.
 */
export class AppError extends Error {
  constructor(
    public code: string,
    public statusCode: number,
    message: string,
    public details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Common error codes for the application.
 */
export const ErrorCodes = {
  NOT_FOUND: 'NOT_FOUND',
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  CONFLICT: 'CONFLICT',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',
} as const;

/**
 * Global error handling middleware for Express.
 * Catches exceptions and returns consistent error response format.
 */
export const errorHandler = (
  err: Error | AppError,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void => {
  const appError =
    err instanceof AppError
      ? err
      : new AppError(ErrorCodes.INTERNAL_SERVER_ERROR, 500, err.message);

  const errorResponse = {
    error: appError.code,
    message: appError.message,
    statusCode: appError.statusCode,
    requestId: String(_request.id) || 'unknown',
    ...(process.env.NODE_ENV === 'development' &&
      appError.details && { details: appError.details }),
  };

  response.status(appError.statusCode).json(errorResponse);
};

/**
 * Utility to create a NOT_FOUND error.
 */
export const notFoundError = (resource: string, id?: string) =>
  new AppError(ErrorCodes.NOT_FOUND, 404, `${resource}${id ? ` with id ${id}` : ''} not found`);

/**
 * Utility to create a validation error.
 */
export const validationError = (message: string, details?: Record<string, unknown>) =>
  new AppError(ErrorCodes.VALIDATION_ERROR, 400, message, details);

/**
 * Wrapper to catch async route handler errors and pass to error middleware.
 */
export const asyncHandler =
  (handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
