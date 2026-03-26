import type { HealthModel } from '../models/health.model.js';

export class HealthService {
  getStatus(): HealthModel {
    return { status: 'ok' };
  }
}

export const healthService = new HealthService();
