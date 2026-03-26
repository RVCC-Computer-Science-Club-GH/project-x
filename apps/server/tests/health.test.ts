import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { app } from '../src/app.js';

describe('GET /health', () => {
  it('responds with 200 and service status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.status).toBe('ok');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.requestId).toBeDefined();
  });
});
