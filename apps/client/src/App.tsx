import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { colors, spacing, typography } from './presentation/styles';
import './service-locator';
import { Button } from 'react-native';

type RootStackParamList = {
  Home: undefined; // No parameters for Home screen
  About: undefined; // No parameters for About screen
};

// Create a Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();


// Type for the HomeScreen props
type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};
// Type for the AboutScreen props
type AboutScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'About'>;
};



// Home Screen Component
function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pathster</Text>
      <Text style={styles.subtitle}>The Unofficial RVCC Navigation App</Text>
      <Text style={styles.description}>This is the Home Screen</Text>
      <Button
        title="Go to About"
        onPress={() => navigation.navigate('About')} 
        />
      <StatusBar style="auto" />
    </View>
  );
}


// About Screen Component (Example)
function AboutScreen({navigation}: AboutScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Pathster</Text>
      <Text style={styles.description}>This is the About screen.</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')} 
        />
    </View>
    
  );
}

/**
 * Root App Component
 * Sets up the app with clean architecture and dependency injection
 */
export default function App() {
  // Service locator initializes dependencies via side-effect import above.

  return (
    <>
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name= "Home" component={HomeScreen}/>
          <Stack.Screen name= "About" component={AboutScreen}/>
          </Stack.Navigator>
    </NavigationContainer>
     
      <StatusBar style="auto" />
    </>
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
