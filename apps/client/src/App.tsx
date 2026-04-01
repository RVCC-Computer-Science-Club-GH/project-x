import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from './presentation/styles';
import serviceLocator from './service-locator';

/**
 * Root App Component
 * Sets up the app with clean architecture and dependency injection
 */
export default function App() {
  // Service locator initializes all dependencies and use cases
  // Access via serviceLocator.getGetCurrentUserUseCase(), etc.

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
