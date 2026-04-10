/**
 * Screen Components
 * Each screen component corresponds to a route in the navigation stack
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../styles';
import { Button } from 'react-native';
import { NavBar } from './nav-bar';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the type for your navigation stack
type RootStackParamList = {
    Home: undefined;
    Maps: undefined;
    GPS: undefined;
    Radio: undefined;
    Help: undefined;
  };
  
  // Define the props for the Map Screen
  type MapScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Maps'>;
  };

/**
 * Map Screen - A searchable map of the RV campus with building locations, parking, and more
 * Allows students to find their classes, parking, and navigate the campus
 */
export const MapScreen: React.FC<MapScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>RV Maps</Text>
        <Text style={styles.subtitle}>Find Your Classes, Parking, and More!</Text>
      </View>
      <View style={styles.nav}>
        <NavBar navigation={navigation}></NavBar>
      </View>
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: spacing.sm,
     alignItems: 'center',
     justifyContent: 'center',
  },
});
