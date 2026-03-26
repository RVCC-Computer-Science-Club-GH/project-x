import type { Request, Response } from 'express';

import { healthService } from '../services/health.service.js';
import { toHealthResponse } from '../views/health.view.js';

/**
 * GET /health
 *
 * Health check endpoint for the Pathster API.
 *
 * @param request Express request object
 * @param response Express response object
 *
 * @returns {Object} 200 OK
 * {
 *   "status": "ok",
 *   "timestamp": "2026-03-25T22:00:00.000Z",
 *   "requestId": "uuid-string"
 * }
 *
 * @example
 * GET /api/health
 * Response: 200 OK
 */
export const getHealth = (request: Request, response: Response): void => {
  const healthModel = healthService.getStatus();
  const payload = toHealthResponse(healthModel);

  response.status(200).json({ ...payload, requestId: request.id });
};
