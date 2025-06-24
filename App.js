// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import StackNavigator from './navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <StackNavigator toggleTheme={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))} />
    </NavigationContainer>
  );
}
