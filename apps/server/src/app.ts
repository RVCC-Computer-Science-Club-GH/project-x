import express from 'express';

import { errorHandler } from './utils/errors.js';
import { requestIdMiddleware } from './middleware/request-id.middleware.js';
import { performanceMonitoringMiddleware } from './middleware/performance-monitoring.middleware.js';
import { logger } from './utils/logger.js';
import { apiRouter } from './routes/index.js';

export const app = express();

// Middleware
app.use(express.json());
app.use(requestIdMiddleware);
app.use(performanceMonitoringMiddleware);

// Request logging
app.use((request, response, next) => {
  logger.info('Incoming request', {
    method: request.method,
    path: request.path,
    requestId: request.id,
  });
  next();
});

// Routes
app.use(apiRouter);

// Error handling (must be last)
app.use(errorHandler);
