/**
 * Reusable UI Components
 * Presentational components that are not tied to specific screens
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { spacing } from '../styles';

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

/**
 * Container Component - Common wrapper for screens
 */
export const Container: React.FC<ContainerProps> = ({ children, style }) => (
  <View style={[styles.container, style]}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
});

// Add more reusable components here as needed:
// - Button
// - Card
// - Input
// - Loading Spinner
// - etc.
