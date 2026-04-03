/**
 * Screen Components
 * Each screen component corresponds to a route in the navigation stack
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, spacing, typography } from '../styles';

/**
 * Home Screen - Entry point of the app
 */
export const HomeScreen: React.FC<{ onNavigateToMap: () => void }> = ({ onNavigateToMap }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Pathster</Text>
      <Text style={styles.subtitle}>Start exploring</Text>
      
      <Pressable 
        style={styles.button}
        onPress={onNavigateToMap}
      >
        <Text style={styles.buttonText}>View Map</Text>
      </Pressable>
    </View>
  );
};

export { MapScreen } from './MapScreen';

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
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.background,
    ...typography.body,
    fontWeight: '600',
  },
});
