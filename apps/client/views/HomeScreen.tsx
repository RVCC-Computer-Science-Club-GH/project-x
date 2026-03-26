import {useNavigation} from '@react-navigation/native';
import { View, Button } from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View>
        <Button
        title="Go to Jane's profile"
        onPress={() =>
            navigation.navigate('Profile', {name: 'Jane'})
        }
        />
        <Button
        title="Go to Radio"
        onPress={() =>
            navigation.navigate('Radio')
        }
        />
        <Button
        title="Go to Map"
        onPress={() =>
            navigation.navigate('Map')
        }
        />
    </View>
  );
}
