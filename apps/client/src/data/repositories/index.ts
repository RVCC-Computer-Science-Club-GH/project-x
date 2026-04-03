/**
 * Repository Implementations
 * Implements domain repository interfaces
 * Combines remote and local data sources with caching logic
 */

import type { IUserRepository, ILocationRepository } from '../../domain/repositories';
import type { User, Location } from '../../domain/entities';
import type { IRemoteDataSource, ILocalDataSource } from '../datasources';
import type { UserDTO, LocationDTO } from '../models';

/**
 * Converts DTO to Domain Entity
 */
const userDtoToEntity = (dto: UserDTO): User => ({
  ...dto,
  createdAt: new Date(dto.createdAt),
});

const locationDtoToEntity = (dto: LocationDTO): Location => ({
  ...dto,
  createdAt: new Date(dto.createdAt),
});

export class UserRepository implements IUserRepository {
  constructor(
    private remoteDataSource: IRemoteDataSource,
    private localDataSource: ILocalDataSource,
  ) {}

  async getUser(id: string): Promise<User> {
    try {
      // Try to get from remote (API)
      const userDto = await this.remoteDataSource.getUser(id);
      // Cache locally
      await this.localDataSource.cacheUser(userDto);
      return userDtoToEntity(userDto);
    } catch (error) {
      // Fallback to local cache on error
      const cachedUser = await this.localDataSource.getCachedUser(id);
      if (cachedUser) {
        return userDtoToEntity(cachedUser);
      }
      throw error;
    }
  }

  async getCurrentUser(): Promise<User> {
    const userDto = await this.remoteDataSource.getCurrentUser();
    await this.localDataSource.cacheUser(userDto);
    return userDtoToEntity(userDto);
  }

  async updateUser(user: Partial<User>): Promise<User> {
    const userDto = await this.remoteDataSource.updateUser(user.id!, {
      ...user,
      createdAt: user.createdAt?.toISOString(),
    });
    await this.localDataSource.cacheUser(userDto);
    return userDtoToEntity(userDto);
  }
}

export class LocationRepository implements ILocationRepository {
  constructor(
    private remoteDataSource: IRemoteDataSource,
    private localDataSource: ILocalDataSource,
  ) {}

  async getLocations(): Promise<Location[]> {
    try {
      const locationDtos = await this.remoteDataSource.getLocations();
      await this.localDataSource.cacheLocations(locationDtos);
      return locationDtos.map(locationDtoToEntity);
    } catch (error) {
      const cachedLocations = await this.localDataSource.getCachedLocations();
      if (cachedLocations.length > 0) {
        return cachedLocations.map(locationDtoToEntity);
      }
      throw error;
    }
  }

  async getLocation(id: string): Promise<Location> {
    const locationDto = await this.remoteDataSource.getLocation(id);
    return locationDtoToEntity(locationDto);
  }

  async createLocation(location: Omit<Location, 'id' | 'createdAt'>): Promise<Location> {
    const locationDto = await this.remoteDataSource.createLocation(
      location as Omit<LocationDTO, 'id' | 'createdAt'>,
    );
    return locationDtoToEntity(locationDto);
  }
}
