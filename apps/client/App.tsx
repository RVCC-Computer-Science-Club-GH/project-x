import * as React from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './views/HomeScreen';
import ProfileScreen from './views/ProfileScreen';
import RadioScreen from './views/RadioScreen';
import MapScreen from './views/MapScreen';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {title: 'Welcome'},
    },
    Profile: {
      screen: ProfileScreen,
      options: {title: 'User Profile'},
    },
    Radio: {
      screen: RadioScreen,
      options: {title: 'RVCC Radio'},
    },
    Map: {
      screen: MapScreen,
      options: {title: 'RVCC Map'},
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}