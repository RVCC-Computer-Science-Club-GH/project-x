import { View, Text } from 'react-native';

import ImageGallery from '../components/ImageGallery';

export default function RadioScreen() {
  return (
    <View>
        <Text>This is Radio screen</Text>
        <ImageGallery name="games" />
        <p>This is Paragraph</p>
        <ul>
            <li>item</li>
            <li>item2</li>
        </ul>
    </View>
    )
}
