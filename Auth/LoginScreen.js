import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://192.168.100.8:3000/api/login', { email, password });
      await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
      navigation.replace('MainApp');
    } catch {
      Alert.alert('Login failed', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={{ width: 100, height: 100 }} />
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Enter Email" onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Enter Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.link}>
        Don’t have account? <Text onPress={() => navigation.navigate('Signup')}>Sign Up</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 20 },
  input: { backgroundColor: '#eee', width: '100%', padding: 10, marginBottom: 10, borderRadius: 10 },
  link: { marginTop: 10 }
});
