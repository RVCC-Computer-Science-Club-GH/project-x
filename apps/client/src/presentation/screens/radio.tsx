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
  
  // Define the props for the GpsScreen
  type RadioScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Radio'>;
  };

/**
 * Radio Screen - Campus radio station for RV students
 */
export const RadioScreen: React.FC<RadioScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>RV Radio</Text>
      <Text style={styles.subtitle}>Tune in to Campus Life</Text>
      </View>
     <View style={styles.nav}> <NavBar navigation={navigation}></NavBar>
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
    verticalAlign: 'top',
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
