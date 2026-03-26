/**
 * Database migration example and runner.
 * This shows how to structure database changes for Pathster.
 *
 * To add a new migration:
 * 1. Create a new file: 002_add_broadcasts_table.ts
 * 2. Export an up() and down() function
 * 3. Run: npm run db:migrate
 */

/**
 * Example migration interface.
 * Implement this for each migration file.
 */
export interface Migration {
  name: string;
  up(): Promise<void>;
  down(): Promise<void>;
}

/**
 * Migration 001: Create initial locations collection.
 * This is an example migration structure.
 * Actual implementation depends on your MongoDB ODM (Mongoose, Prisma, etc.).
 */
export const migration001_createLocationsCollection: Migration = {
  name: '001_create_locations_collection',

  /**
   * Run migration (create collection + indexes).
   * Example for Mongoose:
   *
   * db.locations.createIndex({ building: 1 })
   * db.locations.createIndex({ category: 1 })
   * db.locations.createIndex({ verified: 1 })
   * db.locations.createIndex({ gps: '2dsphere' })
   */
  async up() {
    // Implement actual migration logic here
    // await db.collection('locations').createIndex({ building: 1 });
  },

  /**
   * Rollback migration (drop table).
   */
  async down() {
    // await db.query('DROP TABLE locations;');
  },
};

/**
 * Migration 002: Create submissions collection (citizen science data).
 */
export const migration002_createSubmissionsCollection: Migration = {
  name: '002_create_submissions_collection',

  /**
   * db.submissions.createIndex({ user_id: 1 })
   * db.submissions.createIndex({ location_id: 1 })
   * db.submissions.createIndex({ verified: 1 })
   * db.submissions.createIndex({ created_at: -1 })
   */
  async up() {
    // Implement actual migration logic here
  },

  async down() {
    // Implement rollback logic here
  },
};

/**
 * Get all registered migrations in order.
 */
export const getAllMigrations = (): Migration[] => [
  migration001_createLocationsCollection,
  migration002_createSubmissionsCollection,
];

/**
 * Run pending migrations.
 * TBD: Implement using your database client.
 */
export const runMigrations = async (): Promise<void> => {
  const migrations = getAllMigrations();

  for (const migration of migrations) {
    console.log(`Running migration: ${migration.name}`);
    try {
      await migration.up();
      console.log(`✓ Migration ${migration.name} completed`);
    } catch (error) {
      console.error(`✗ Migration ${migration.name} failed:`, error);
      throw error;
    }
  }
};

/**
 * Rollback migrations.
 * TBD: Implement using your database client.
 */
export const rollbackMigrations = async (): Promise<void> => {
  const migrations = getAllMigrations().reverse();

  for (const migration of migrations) {
    console.log(`Rolling back migration: ${migration.name}`);
    try {
      await migration.down();
      console.log(`✓ Migration ${migration.name} rolled back`);
    } catch (error) {
      console.error(`✗ Migration rollback ${migration.name} failed:`, error);
      throw error;
    }
  }
};
