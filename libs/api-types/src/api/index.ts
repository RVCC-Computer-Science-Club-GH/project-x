// API request and response types

import type { Location, Broadcast, User } from '../models/index.js';

/**
 * Standard API error response format.
 */
export interface ApiErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  requestId: string;
  details?: Record<string, unknown>;
}

/**
 * Paginated response wrapper.
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/**
 * GET /api/locations response.
 */
export type GetLocationsResponse = PaginatedResponse<Location>;

/**
 * GET /api/locations/:id response.
 */
export interface GetLocationResponse {
  data: Location;
  requestId: string;
}

/**
 * POST /api/locations response.
 */
export interface CreateLocationResponse {
  data: Location;
  message: string;
  requestId: string;
}

/**
 * GET /api/broadcasts response.
 */
export interface GetBroadcastsResponse {
  data: Broadcast[];
  requestId: string;
}

/**
 * GET /api/submissions/leaderboard response.
 */
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  submissionCount: number;
  incentiveBalance: User['incentiveBalance'];
}

export type GetLeaderboardResponse = PaginatedResponse<LeaderboardEntry>;

/**
 * GET /api/health response.
 */
export interface HealthResponse {
  status: 'ok';
  requestId: string;
  timestamp: Date;
}
