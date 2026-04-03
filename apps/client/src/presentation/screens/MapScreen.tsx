/**
 * Map Screen
 * Cross-platform map component - automatically selects native or web version
 * 
 * This file exports from platform-specific implementations:
 * - MapScreen.native.tsx (iOS/Android with MapLibre GL)
 * - MapScreen.web.tsx (Browser with list view)
 */

export { MapScreen } from './MapScreen.native';

