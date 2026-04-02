/**
 * Repository Interfaces (Abstractions)
 * Define contracts for data access operations
 * Implementations are in the data layer
 */

import type { User, Location } from '../entities';

export interface IUserRepository {
  getUser(id: string): Promise<User>;
  getCurrentUser(): Promise<User>;
  updateUser(user: Partial<User>): Promise<User>;
}

export interface ILocationRepository {
  getLocations(): Promise<Location[]>;
  getLocation(id: string): Promise<Location>;
  createLocation(location: Omit<Location, 'id' | 'createdAt'>): Promise<Location>;
}
