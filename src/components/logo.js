import {Image, StyleSheet} from 'react-native';

export default function Logo() {
  return (
    <Image source={require('../assets/logo256.png')} style={styles.image} />
  );
}

const styles = StyleSheet.create({
  image: {
    height: 256,
    marginBottom: 24,
  },
});
