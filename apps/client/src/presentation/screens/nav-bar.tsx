/**
 * Screen Components
 * Each screen component corresponds to a route in the navigation stack
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../styles';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';



type RootStackParamList = {
    Home: undefined; // No parameters for Home screen
    Maps: undefined; // No parameters for Map screen
    GPS: undefined; // No parameters for GPS screen
    Radio: undefined; // No parameters for Radio screen
    Help: undefined; // No parameters for Help screen
  };
  
  // Create a Stack Navigator
  const Stack = createStackNavigator<RootStackParamList>();
  
  
  // Type for the HomeScreen props
  type HomeScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  };

  // Type for the MapScreen props
  type MapScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Maps'>;
  };

  // Type for the GPSScreen props
  type GpsScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'GPS'>;
  };

  // Type for the MapScreen props
  type RadioScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Radio'>;
  };

  // Type for the HelpScreen props
  type HelpScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Help'>;
  };

  // Type for the NavBar props
type NavBarProps = {
    navigation: StackNavigationProp<RootStackParamList>;
  };

/**
 * Navigation Bar - Common component for navigating between screens
 * Provides buttons for Home, Map, GPS, Radio, and Help screens
 * Used in all main screens for consistent navigation
 */
export const NavBar: React.FC<NavBarProps> = ({navigation}) => {
  return (
    <View style={styles.nav}>
        <Button color="#5e498a" title="Home" onPress={() => {navigation.navigate('Home')}} />
        <Button color="#5e498a" title="Map" onPress={() => {navigation.navigate('Maps')}} />
        <Button color="#5e498a" title="GPS" onPress={() => {navigation.navigate('GPS')}} />
        <Button color="#5e498a" title="Radio" onPress={() => {navigation.navigate('Radio')}} />
        <Button color="#5e498a" title="Help" onPress={() => {navigation.navigate('Help')}} /> 
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  nav: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    padding: spacing.sm,
  }
});
