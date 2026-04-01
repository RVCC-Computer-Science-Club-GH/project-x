/**
 * Environment Configuration
 * Loads and validates environment variables from Expo's .env files
 */

interface AppConfig {
  apiUrl: string;
  apiTimeout: number;
  appName: string;
  appVersion: string;
  enableLogging: boolean;
  enableMockData: boolean;
}

const getEnvVariable = (name: string, defaultValue?: string): string => {
  const value = process.env[name] ?? defaultValue;
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export const config: AppConfig = {
  apiUrl: getEnvVariable('EXPO_PUBLIC_API_URL', 'http://localhost:3000'),
  apiTimeout: parseInt(getEnvVariable('EXPO_PUBLIC_API_TIMEOUT', '30000'), 10),
  appName: getEnvVariable('EXPO_PUBLIC_APP_NAME', 'Pathster'),
  appVersion: getEnvVariable('EXPO_PUBLIC_APP_VERSION', '1.0.0'),
  enableLogging: getEnvVariable('EXPO_PUBLIC_ENABLE_LOGGING', 'false') === 'true',
  enableMockData: getEnvVariable('EXPO_PUBLIC_ENABLE_MOCK_DATA', 'false') === 'true',
};
