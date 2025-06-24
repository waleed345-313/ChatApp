import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => navigation.replace('Login'), 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={{ width: 150, height: 150 }} />
      <Text style={styles.text}>@Copyright Muhammad Waleed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#9b8cd0' },
  text: { position: 'absolute', bottom: 40, color: '#fff' }
});
