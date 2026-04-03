/**
 * Service Locator / Dependency Injection
 * Instantiates and provides access to all services
 * This is a simple implementation - could be upgraded to use a DI container
 */

import { createApiClient } from './config/api';
import { RemoteDataSource, LocalDataSource, GeoJSONDataSource } from './data/datasources';
import { UserRepository, LocationRepository } from './data/repositories';
import {
  GetUserUseCase,
  GetCurrentUserUseCase,
  GetLocationsUseCase,
} from './domain/usecases';

class ServiceLocator {
  private static instance: ServiceLocator;

  // Datasources
  private remoteDataSource: RemoteDataSource;
  private localDataSource: LocalDataSource;
  private geojsonDataSource: GeoJSONDataSource;

  // Repositories
  private userRepository: UserRepository;
  private locationRepository: LocationRepository;

  // Use Cases
  private getUserUseCase: GetUserUseCase;
  private getCurrentUserUseCase: GetCurrentUserUseCase;
  private getLocationsUseCase: GetLocationsUseCase;

  private constructor() {
    // Initialize datasources
    const apiClient = createApiClient();
    this.remoteDataSource = new RemoteDataSource(apiClient);
    this.localDataSource = new LocalDataSource();
    this.geojsonDataSource = new GeoJSONDataSource();

    // Initialize repositories
    this.userRepository = new UserRepository(this.remoteDataSource, this.localDataSource);
    this.locationRepository = new LocationRepository(
      this.remoteDataSource,
      this.localDataSource,
    );

    // Initialize use cases
    this.getUserUseCase = new GetUserUseCase(this.userRepository);
    this.getCurrentUserUseCase = new GetCurrentUserUseCase(this.userRepository);
    this.getLocationsUseCase = new GetLocationsUseCase(this.locationRepository);
  }

  static getInstance(): ServiceLocator {
    if (!ServiceLocator.instance) {
      ServiceLocator.instance = new ServiceLocator();
    }
    return ServiceLocator.instance;
  }

  // Expose use cases
  getGetUserUseCase(): GetUserUseCase {
    return this.getUserUseCase;
  }

  getGetCurrentUserUseCase(): GetCurrentUserUseCase {
    return this.getCurrentUserUseCase;
  }

  getGetLocationsUseCase(): GetLocationsUseCase {
    return this.getLocationsUseCase;
  }

  // Expose datasources
  getGeoJSONDataSource(): GeoJSONDataSource {
    return this.geojsonDataSource;
  }
}

export default ServiceLocator.getInstance();
