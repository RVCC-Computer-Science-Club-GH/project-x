/**
 * Database seed data for development and testing.
 * Provides mock campus locations for local development.
 */

// TBD: Import from @pathster/api-types once workspace resolution is configured
// import type { Location } from '@pathster/api-types';

/**
 * Mock campus locations for RVCC.
 * Replace with actual campus data when available.
 */
export const seedLocations: Array<{
  name: string;
  building: string;
  category: 'classroom' | 'building' | 'facility' | 'outdoor' | 'poi';
  gps: { lat: number; lng: number };
  description?: string;
  verified: boolean;
}> = [
  {
    name: 'Math Building - Room 101',
    building: 'Math Building',
    category: 'classroom',
    gps: { lat: 40.2206, lng: -74.6597 },
    description: 'Calculus I classroom',
    verified: true,
  },
  {
    name: 'Science Hall - Lab 205',
    building: 'Science Hall',
    category: 'classroom',
    gps: { lat: 40.221, lng: -74.659 },
    description: 'Biology lab',
    verified: true,
  },
  {
    name: 'Main Library',
    building: 'Library',
    category: 'building',
    gps: { lat: 40.2215, lng: -74.66 },
    description: 'Main library building',
    verified: true,
  },
  {
    name: 'Student Center Cafe',
    building: 'Student Center',
    category: 'facility',
    gps: { lat: 40.222, lng: -74.6605 },
    description: 'Campus dining',
    verified: true,
  },
  {
    name: 'Outdoor Amphitheater',
    building: 'Campus Grounds',
    category: 'outdoor',
    gps: { lat: 40.2225, lng: -74.661 },
    description: 'Open air performance space',
    verified: true,
  },
  {
    name: 'Radio Club Studio',
    building: 'Student Center',
    category: 'facility',
    gps: { lat: 40.2221, lng: -74.6606 },
    description: 'Radio Club broadcast studio',
    verified: true,
  },
];

/**
 * Seed the database with initial location data.
 * TBD: Implement using your database client.
 *
 * Usage:
 *   npm run db:seed
 */
// eslint-disable-next-line @typescript-eslint/require-await
export const seedDatabase = async (): Promise<void> => {
  console.log(`Seeding ${seedLocations.length} locations...`);

  for (const location of seedLocations) {
    console.log(`  → Inserting ${location.name}`);
    // TBD: Insert into database
    // await db.insertLocation(location);
  }

  console.log('✓ Seeding complete');
};
