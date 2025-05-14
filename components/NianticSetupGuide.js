import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// This is a mock component since we're using the temporary AR implementation
const NianticSetupGuide = ({ onRetryInitialization }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Niantic AR Setup</Text>
      <Text style={styles.text}>
        This app is currently running in temporary AR mode. 
        The Niantic AR setup is not available.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={onRetryInitialization}
      >
        <Text style={styles.buttonText}>Return to App</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF5E3A',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
  button: {
    backgroundColor: '#FF5E3A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NianticSetupGuide; 