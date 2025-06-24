import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Modal } from 'react-native';
import axios from 'axios';

export default function SignupScreen({ navigation }) {
  const [data, setData] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' });
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignup = async () => {
    if (data.password !== data.confirm) return Alert.alert('Error', 'Passwords do not match');
    try {
      await axios.post('http://192.168.100.8:3000/api/register', data);
      setModalVisible(true);
    } catch (e) {
      Alert.alert('Signup Failed', e.response?.data?.error || 'Server error');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="First Name" style={styles.input} onChangeText={v => setData({ ...data, firstName: v })} />
      <TextInput placeholder="Last Name" style={styles.input} onChangeText={v => setData({ ...data, lastName: v })} />
      <TextInput placeholder="Email" style={styles.input} onChangeText={v => setData({ ...data, email: v })} />
      <TextInput placeholder="Create Password" style={styles.input} secureTextEntry onChangeText={v => setData({ ...data, password: v })} />
      <TextInput placeholder="Confirm Password" style={styles.input} secureTextEntry onChangeText={v => setData({ ...data, confirm: v })} />
      <Button title="Sign Up" onPress={handleSignup} />

      <Modal visible={modalVisible} transparent>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text>Account Created Successfully!</Text>
            <Button title="Go to Login" onPress={() => { setModalVisible(false); navigation.navigate('Login'); }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  input: { backgroundColor: '#ddd', marginVertical: 6, padding: 10, borderRadius: 10 },
  modal: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000088' },
  modalContent: { backgroundColor: '#fff', padding: 30, borderRadius: 10 }
});
