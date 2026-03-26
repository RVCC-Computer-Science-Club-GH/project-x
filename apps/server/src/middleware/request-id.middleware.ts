import type { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

/**
 * Middleware to assign a unique request ID for tracing and logging.
 */
export const requestIdMiddleware = (
  request: Request,
  _response: Response,
  next: NextFunction,
): void => {
  request.id = (request.headers['x-request-id'] as string) || uuidv4();
  next();
};
