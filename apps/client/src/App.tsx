import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from './presentation/styles';
import './service-locator';

/**
 * Root App Component
 * Sets up the app with clean architecture and dependency injection
 */
export default function App() {
  // Service locator initializes dependencies via side-effect import above.

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pathster</Text>
      <Text style={styles.subtitle}>Clean Architecture Ready</Text>
      <Text style={styles.description}>
        Service Locator initialized with all dependencies and use cases
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
