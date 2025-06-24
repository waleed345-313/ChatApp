import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';

export default function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.100.8:3000/api/users').then(res => setUsers(res.data));
  }, []);

  return (
    <FlatList
      data={users}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Chat', { receiver: item })}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <Text>{item.firstName} {item.lastName}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 }
});

