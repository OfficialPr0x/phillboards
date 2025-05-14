import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTempAR } from '../context/TempARContext';

const TempARSetupGuide = ({ onRetryInitialization }) => {
  const { initializationError } = useTempAR();
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="info" size={36} color="#FF5E3A" />
        <Text style={styles.title}>Temporary AR Mode</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About This Mode</Text>
        <Text style={styles.text}>
          You're currently using our temporary AR solution while we finalize our integration with Niantic.
          This mode provides core AR functionality with some limitations.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features Available</Text>
        <View style={styles.featureItem}>
          <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
          <Text style={styles.featureText}>Place virtual phillboards at your location</Text>
        </View>
        <View style={styles.featureItem}>
          <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
          <Text style={styles.featureText}>View phillboards on the map</Text>
        </View>
        <View style={styles.featureItem}>
          <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
          <Text style={styles.featureText}>Camera-based placement</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Limitations</Text>
        <View style={styles.featureItem}>
          <MaterialIcons name="info" size={24} color="#FFC107" />
          <Text style={styles.featureText}>Simplified surface detection</Text>
        </View>
        <View style={styles.featureItem}>
          <MaterialIcons name="info" size={24} color="#FFC107" />
          <Text style={styles.featureText}>Limited persistent anchors (resets on app restart)</Text>
        </View>
        <View style={styles.featureItem}>
          <MaterialIcons name="info" size={24} color="#FFC107" />
          <Text style={styles.featureText}>No shared AR experiences</Text>
        </View>
      </View>
      
      {initializationError && (
        <View style={styles.errorSection}>
          <Text style={styles.errorTitle}>Error Details</Text>
          <Text style={styles.errorText}>{initializationError}</Text>
        </View>
      )}
      
      <TouchableOpacity 
        style={styles.button}
        onPress={onRetryInitialization}
      >
        <Text style={styles.buttonText}>Continue to AR Experience</Text>
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          We're working to bring you the full Niantic-powered experience soon!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#FF5E3A',
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: '#555',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#555',
  },
  errorSection: {
    backgroundColor: '#FFF3F0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: '#FF5E3A',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF5E3A',
  },
  errorText: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: '#FF5E3A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default TempARSetupGuide;