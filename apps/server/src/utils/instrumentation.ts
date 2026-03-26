/**
 * Application instrumentation for performance and error tracking.
 * Integrates with monitoring services (Sentry, Datadog, etc.).
 */

import { logger } from '../utils/logger.js';

/**
 * Initialize application instrumentation.
 * Call this at app startup time.
 *
 * TBD: Add integrations for:
 * - Sentry for error tracking
 * - Prometheus for metrics export
 * - Datadog APM
 */
export const initializeInstrumentation = (): void => {
  logger.info('Instrumentation initialized');

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught exception', {
      error: error.message,
      stack: error.stack,
    });
    // Optionally: send to Sentry
    process.exit(1);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled rejection', {
      reason,
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      promise: String(promise),
    });
    // Optionally: send to Sentry
  });
};

/**
 * Measure execution time and log to monitoring service.
 *
 * Usage:
 *   const result = await recordMetric('fetch_locations', async () => {
 *     return await locationService.fetchAll();
 *   });
 */
export const recordMetric = async <T>(
  name: string,
  fn: () => Promise<T>,
  tags?: Record<string, string>,
): Promise<T> => {
  const startTime = performance.now();

  try {
    const result = await fn();
    const duration = performance.now() - startTime;

    logger.debug('Metric recorded', {
      name,
      duration,
      success: true,
      ...tags,
    });

    // TBD: Send to Datadog/Prometheus
    // metrics.timing(name, duration, tags);

    return result;
  } catch (error) {
    const duration = performance.now() - startTime;

    logger.error('Metric failed', {
      name,
      duration,
      error: error instanceof Error ? error.message : String(error),
      ...tags,
    });

    throw error;
  }
};

/**
 * Get application health for monitoring dashboards.
 */
export const getApplicationHealth = () => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();

  return {
    uptime,
    memoryUsage: {
      heapUsedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      heapTotalMb: Math.round(memoryUsage.heapTotal / 1024 / 1024),
      externalMb: Math.round(memoryUsage.external / 1024 / 1024),
    },
    timestamp: new Date(),
  };
};
