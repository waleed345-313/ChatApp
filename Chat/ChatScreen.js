import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, Button, FlatList, KeyboardAvoidingView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://192.168.100.8:3000');

export default function ChatScreen({ route }) {
  const { receiver } = route.params;
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);

  useEffect(() => {
    AsyncStorage.getItem('user').then(data => {
      const u = JSON.parse(data);
      setUser(u);
      socket.emit('join', u._id);
      loadMessages(u._id);
    });
  }, []);

  const loadMessages = async (uid) => {
    const res = await axios.get(`http://192.168.100.8:3000/api/messages/${uid}/${receiver._id}`);
    setMessages(res.data);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    const res = await axios.post('http://192.168.100.8:3000/api/message', {
      senderId: user._id,
      receiverId: receiver._id,
      message,
    });
    setMessages([...messages, res.data]);
    setMessage('');
  };

  useEffect(() => {
    socket.on('newMessage', (msg) => {
      if (msg.senderId === receiver._id || msg.receiverId === receiver._id) {
        setMessages(prev => [...prev, msg]);
      }
    });
  }, []);

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.senderId === user._id ? styles.right : styles.left]}>
            <Text>{item.message}</Text>
          </View>
        )}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bubble: { padding: 10, margin: 5, borderRadius: 10, backgroundColor: '#ddd' },
  left: { alignSelf: 'flex-start' },
  right: { alignSelf: 'flex-end', backgroundColor: '#aef' },
  inputContainer: { flexDirection: 'row', padding: 10 },
  input: { flex: 1, borderWidth: 1, marginRight: 10, borderRadius: 10, paddingHorizontal: 10 }
});