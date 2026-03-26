import type { Request, Response, NextFunction } from 'express';

import { logger } from '../utils/logger.js';

/**
 * Performance monitoring metrics collector.
 * Tracks request duration, response size, and error rates.
 */
export interface RequestMetrics {
  requestId: string;
  method: string;
  path: string;
  statusCode: number;
  duration: number; // milliseconds
  responseSize: number; // bytes
  error?: string;
}

const metricsCollector: RequestMetrics[] = [];

/**
 * Middleware to collect request performance metrics.
 * Logs slow requests and errors automatically.
 */
export const performanceMonitoringMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const startTime = Date.now();

  response.on('finish', () => {
    const duration = Date.now() - startTime;
    const responseSize = parseInt(response.getHeader('content-length') as string) || 0;
    const statusCode = response.statusCode;

    const metrics: RequestMetrics = {
      requestId: String(request.id) || 'unknown',
      method: request.method,
      path: request.path,
      statusCode,
      duration,
      responseSize,
    };

    metricsCollector.push(metrics);

    const level = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';
    logger.log(level, 'Request completed', {
      ...metrics,
      slow: duration > 1000,
    });

    // Alert on slow responses
    if (duration > 1000) {
      logger.warn('Slow request detected', {
        path: request.path,
        duration,
        threshold: 1000,
      });
    }

    // Alert on large responses
    if (responseSize > 1024 * 1024) {
      logger.warn('Large response detected', {
        path: request.path,
        sizeKb: responseSize / 1024,
      });
    }
  });

  next();
};

/**
 * Get aggregated performance metrics.
 * Useful for monitoring dashboards or health checks.
 */
export const getPerformanceMetrics = () => {
  if (metricsCollector.length === 0) {
    return null;
  }

  const avgDuration =
    metricsCollector.reduce((sum, m) => sum + m.duration, 0) / metricsCollector.length;
  const avgResponseSize =
    metricsCollector.reduce((sum, m) => sum + m.responseSize, 0) / metricsCollector.length;
  const errorCount = metricsCollector.filter((m) => m.statusCode >= 400).length;
  const errorRate = (errorCount / metricsCollector.length) * 100;

  return {
    totalRequests: metricsCollector.length,
    avgDuration,
    avgResponseSize,
    errorRate,
    errors: errorCount,
  };
};

/**
 * Clear collected metrics (call periodically to prevent memory bloat).
 */
export const clearMetrics = () => {
  metricsCollector.length = 0;
};
