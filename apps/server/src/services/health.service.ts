import type { HealthModel } from '../models/health.model.js';

/**
 * HealthService provides basic health check functionality.
 * Used for monitoring and load balancer health checks.
 */
export class HealthService {
  /**
   * Get current health status of the service.
   * @returns Health status model
   */
  getStatus(): HealthModel {
    return { status: 'ok' };
  }
}

export const healthService = new HealthService();
