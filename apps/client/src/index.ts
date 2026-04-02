/**
 * Clean Architecture Structure
 * 
 * Entry point configuration:
 * - This file is referenced by ../index.ts (loaded by Expo)
 * - App.tsx uses dependency injection via service-locator
 * - All business logic is abstracted from the presentation layer
 */

export { default as App } from './App';
