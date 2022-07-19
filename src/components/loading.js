import React from 'react';
import Lottie from 'lottie-react-native';
import { Text, View, StyleSheet } from 'react-native';

export default function Animation(submitSuccess) {
  
  if (submitSuccess) {
    <View>
      <Lottie source={require('../assets/complete_tick_circle.json')} loop={false} autoPlay={false} />
      <Text> Thank you </Text>
    </View>
  }

  if (!submitSuccess) {
    <View>
      <Lottie source={require('../assets/error_oops.json')} loop={false} autoPlay={false} />
      <Text> Home submission failed </Text>
    </View>
  }
  
  return (
    <Lottie source={require('../assets/dot-loading-gif-animation.json')} autoPlay loop />
  );
}