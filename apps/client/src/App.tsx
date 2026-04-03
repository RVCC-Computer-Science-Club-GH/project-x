import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { RootNavigator } from './presentation/navigation';
import { colors } from './presentation/styles';
import './service-locator';

/**
 * Root App Component
 * Sets up the app with clean architecture and dependency injection
 */
export default function App() {
  // Service locator initializes dependencies via side-effect import above.

  return (
    <View style={styles.container}>
      <RootNavigator />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
