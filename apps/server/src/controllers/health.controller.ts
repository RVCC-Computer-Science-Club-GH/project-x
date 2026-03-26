import type { Request, Response } from 'express';

import { healthService } from '../services/health.service.js';
import { toHealthResponse } from '../views/health.view.js';

export const getHealth = (_request: Request, response: Response): void => {
  const healthModel = healthService.getStatus();
  const payload = toHealthResponse(healthModel);

  response.status(200).json(payload);
};
