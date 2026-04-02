/**
 * Use Cases (Business Logic)
 * Orchestrate domain entities and repositories to implement business rules
 * Each use case represents a single user story/action
 */

import type { IUserRepository, ILocationRepository } from '../repositories';
import type { User, Location } from '../entities';

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<User> {
    // Add business logic here
    return this.userRepository.getUser(userId);
  }
}

export class GetCurrentUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User> {
    // Add business logic here
    return this.userRepository.getCurrentUser();
  }
}

export class GetLocationsUseCase {
  constructor(private locationRepository: ILocationRepository) {}

  async execute(): Promise<Location[]> {
    // Add business logic here (filtering, sorting, etc.)
    return this.locationRepository.getLocations();
  }
}
