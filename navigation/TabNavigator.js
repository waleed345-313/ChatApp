import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserListScreen from '../screens/Home/UserListScreen';
import HomeScreen from '../screens/Home/HomeScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Users" component={UserListScreen} />
      <Tab.Screen name="Chats" component={HomeScreen} />
    </Tab.Navigator>
  );
}
