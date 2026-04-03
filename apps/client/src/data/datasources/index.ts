/**
 * Remote Data Source
 * Handles all remote API calls
 * Abstracted from business logic and presentation
 */

import type { UserDTO, LocationDTO } from '../models';
export { GeoJSONDataSource, type GeoJSONFeature, type GeoJSONFeatureCollection } from './geojson.datasource';

export interface IRemoteDataSource {
  getUser(id: string): Promise<UserDTO>;
  getCurrentUser(): Promise<UserDTO>;
  updateUser(id: string, user: Partial<UserDTO>): Promise<UserDTO>;
  getLocations(): Promise<LocationDTO[]>;
  getLocation(id: string): Promise<LocationDTO>;
  createLocation(location: Omit<LocationDTO, 'id' | 'createdAt'>): Promise<LocationDTO>;
}

/**
 * Remote Data Source Implementation
 * Uses the API client to fetch data from the backend
 */
export class RemoteDataSource implements IRemoteDataSource {
  constructor(private apiClient: any) {} // TODO: Replace with actual API client type

  async getUser(id: string): Promise<UserDTO> {
    // TODO: Implement API call
    throw new Error('Not implemented');
  }

  async getCurrentUser(): Promise<UserDTO> {
    // TODO: Implement API call
    throw new Error('Not implemented');
  }

  async updateUser(id: string, user: Partial<UserDTO>): Promise<UserDTO> {
    // TODO: Implement API call
    throw new Error('Not implemented');
  }

  async getLocations(): Promise<LocationDTO[]> {
    // TODO: Implement API call
    throw new Error('Not implemented');
  }

  async getLocation(id: string): Promise<LocationDTO> {
    // TODO: Implement API call
    throw new Error('Not implemented');
  }

  async createLocation(location: Omit<LocationDTO, 'id' | 'createdAt'>): Promise<LocationDTO> {
    // TODO: Implement API call
    throw new Error('Not implemented');
  }
}

/**
 * Local Data Source
 * Handles local data persistence (AsyncStorage, SQLite, etc.)
 */
export interface ILocalDataSource {
  getCachedUser(id: string): Promise<UserDTO | null>;
  cacheUser(user: UserDTO): Promise<void>;
  getCachedLocations(): Promise<LocationDTO[]>;
  cacheLocations(locations: LocationDTO[]): Promise<void>;
}

export class LocalDataSource implements ILocalDataSource {
  // TODO: Implement local data persistence using AsyncStorage or SQLite

  async getCachedUser(id: string): Promise<UserDTO | null> {
    throw new Error('Not implemented');
  }

  async cacheUser(user: UserDTO): Promise<void> {
    throw new Error('Not implemented');
  }

  async getCachedLocations(): Promise<LocationDTO[]> {
    throw new Error('Not implemented');
  }

  async cacheLocations(locations: LocationDTO[]): Promise<void> {
    throw new Error('Not implemented');
  }
}
