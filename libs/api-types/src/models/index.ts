// Domain models shared between backend and frontend

/**
 * Represents a campus location (classroom, building, facility, etc.).
 * Used for both internal storage and API responses.
 */
export interface Location {
  id: string;
  name: string;
  building: string;
  category: 'classroom' | 'building' | 'facility' | 'outdoor' | 'poi';
  gps: {
    lat: number;
    lng: number;
  };
  description?: string;
  verified: boolean;
  submittedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Request payload for submitting a new location.
 */
export interface SubmitLocationRequest {
  name: string;
  building: string;
  category: Location['category'];
  gps: Location['gps'];
  description?: string;
  photoUrls?: string[];
  sensorTags?: Record<string, unknown>;
}

/**
 * Radio broadcast information.
 */
export interface Broadcast {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  streamUrl: string;
  isLive: boolean;
  createdAt: Date;
}

/**
 * Citizen science submission (photo, pin, or sensor data).
 */
export interface Submission {
  id: string;
  type: 'photo' | 'pin' | 'sensor_tag';
  locationId?: string;
  userId: string;
  photoUrls?: string[];
  sensorData?: Record<string, unknown>;
  verified: boolean;
  createdAt: Date;
}

/**
 * User profile and leaderboard information.
 */
export interface User {
  id: string;
  email: string;
  name: string;
  submissionCount: number;
  incentiveBalance: {
    giftCards: number;
    mealVouchers: number;
    academicCredits: number;
  };
  leaderboardRank?: number;
  createdAt: Date;
}
