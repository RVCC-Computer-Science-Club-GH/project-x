import { Text } from 'react-native';

type ImageGalleryProps = {
    name: string
}

export default function ImageGallery(props: ImageGalleryProps) {
  return <Text>Image Gallery Component {props.name}</Text>;
}