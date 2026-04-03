/**
 * Navigation Setup
 * Simple navigation implementation without React Navigation
 * TODO: Upgrade to @react-navigation/native when compatible versions are available
 */

import React, { useState } from 'react';
import { HomeScreen, MapScreen } from '../screens';

export type RootStackParamList = {
  Home: undefined;
  Map: undefined;
  Details: { id: string };
};

export type CurrentScreen = 'Home' | 'Map' | 'Details';

/**
 * Root Navigator Component
 * Simple screen management without React Navigation
 * This can be upgraded to use React Navigation once all dependencies are compatible
 */
export const RootNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<CurrentScreen>('Home');

  const handleNavigateToMap = () => {
    setCurrentScreen('Map');
  };

  const handleNavigateHome = () => {
    setCurrentScreen('Home');
  };

  switch (currentScreen) {
    case 'Map':
      return (
        <MapScreen />
      );
    case 'Home':
    default:
      return (
        <HomeScreen onNavigateToMap={handleNavigateToMap} />
      );
  }
};

