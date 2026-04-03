/**
 * Data Models (DTOs)
 * Data transfer objects for API responses and internal data structures
 * These map to the API responses and can differ from domain entities
 */

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface LocationDTO {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  description?: string;
  createdAt: string;
}
