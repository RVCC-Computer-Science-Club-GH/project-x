import * as React from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}

import {useNavigation} from '@react-navigation/native';
import { Button, Text } from 'react-native';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', {name: 'Jane'})
      }
    />
  );
}

function ProfileScreen({route}) {
  return <Text>This is {route.params.name}'s profile</Text>;
}