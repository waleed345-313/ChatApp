import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUser = async (user) => {
  await AsyncStorage.setItem('user', JSON.stringify(user));
};

export const getUser = async () => {
  const data = await AsyncStorage.getItem('user');
  return JSON.parse(data);
};

export const logout = async () => {
  await AsyncStorage.removeItem('user');
};
