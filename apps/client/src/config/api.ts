/**
 * API Client Configuration
 * Configures the HTTP client for communicating with the backend API
 */

import { config } from './env';

export const apiClientConfig = {
  baseURL: config.apiUrl,
  timeout: config.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Creates an API client instance
 * Can be expanded to use Axios, Fetch, or another HTTP library
 */
export const createApiClient = () => {
  // TODO: Implement API client factory (Axios/Fetch wrapper)
  // This will be used by datasources to make HTTP requests
  return {
    get: async (url: string) => {
      // Implementation
    },
    post: async (url: string, data: any) => {
      // Implementation
    },
    put: async (url: string, data: any) => {
      // Implementation
    },
    delete: async (url: string) => {
      // Implementation
    },
  };
};
