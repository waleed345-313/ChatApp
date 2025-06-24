import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function SettingsScreen({ toggleTheme }) {
  const [isEnabled, setIsEnabled] = React.useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };

  return (
    <View style={styles.container}>
      <Text>Dark Mode</Text>
      <Switch onValueChange={toggleSwitch} value={isEnabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});
