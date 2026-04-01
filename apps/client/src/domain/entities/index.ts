/**
 * Domain Entities
 * Core business models that represent the core of the application
 * These should be independent of any framework or external library
 */

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

export interface Location {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  description?: string;
  createdAt: Date;
}
