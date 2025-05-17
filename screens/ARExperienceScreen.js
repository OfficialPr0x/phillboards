import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, Platform, Linking } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useAR } from '../context/ARContext';
import ARView from '../components/ar/ARView';

const ARExperienceScreen = ({ navigation }) => {
  const {
    isInitialized,
    isInitializing,
    initializationError,
    location,
    retryInitialization,
    checkARSupport,
  } = useAR();
  
  const [arMode, setArMode] = useState(false);
  const [arSupported, setArSupported] = useState(null);
  const [reasons, setReasons] = useState([]);
  
  // Check AR support on mount
  useEffect(() => {
    const checkSupport = async () => {
      try {
        const supported = await checkARSupport();
        setArSupported(supported);
        
        // Set reasons why AR might not be available
        const newReasons = [];
        if (!supported) {
          if (Platform.OS === 'web') {
            newReasons.push('WebXR is not supported in your browser');
            newReasons.push('Try using Chrome or Edge on Android/Windows');
          } else {
            newReasons.push('AR is not supported on this device');
            newReasons.push('AR requires ARCore (Android) or ARKit (iOS)');
          }
        }
        
        if (!location) {
          newReasons.push('Location services are not available');
        }
        
        setReasons(newReasons);
      } catch (error) {
        console.error('Error checking AR support:', error);
        setArSupported(false);
        setReasons(['Error checking AR support', error.message]);
      }
    };
    
    checkSupport();
  }, [checkARSupport, location]);
  
  // Start AR experience
  const handleStartAR = () => {
    setArMode(true);
  };
  
  // Exit AR experience
  const handleExitAR = () => {
    setArMode(false);
  };
  
  // Open browser AR (for web fallback on native)
  const openBrowserAR = async () => {
    const url = 'https://phillboards.app/ar';
    const supported = await Linking.canOpenURL(url);
    
    if (supported) {
      await Linking.openURL(url);
    } else {
      alert('Cannot open browser AR experience');
    }
  };
  
  // If in AR mode, show AR view
  if (arMode) {
    return (
      <View style={styles.container}>
        <ARView />
        <TouchableOpacity 
          style={styles.exitButton}
          onPress={handleExitAR}
        >
          <MaterialIcons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
  
  // Otherwise show AR info screen
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>AR Experience</Text>
          <Text style={styles.subtitle}>Discover Phillboards in augmented reality</Text>
        </View>
        
        <View style={styles.statusCard}>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>AR Status:</Text>
            <Text style={[
              styles.statusValue, 
              {color: isInitialized ? '#4CAF50' : '#FF9800'}
            ]}>
              {isInitializing ? 'Initializing...' : (isInitialized ? 'Ready' : 'Not Ready')}
            </Text>
          </View>
          
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Device Supported:</Text>
            <Text style={[
              styles.statusValue, 
              {color: arSupported ? '#4CAF50' : '#F44336'}
            ]}>
              {arSupported === null ? 'Checking...' : (arSupported ? 'Yes' : 'No')}
            </Text>
          </View>
          
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Location Available:</Text>
            <Text style={[
              styles.statusValue, 
              {color: location ? '#4CAF50' : '#F44336'}
            ]}>
              {location ? 'Yes' : 'No'}
            </Text>
          </View>
          
          {initializationError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Error: {initializationError}</Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={retryInitialization}
              >
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {reasons.length > 0 && (
            <View style={styles.reasonsContainer}>
              <Text style={styles.reasonsTitle}>Issues:</Text>
              {reasons.map((reason, index) => (
                <Text key={index} style={styles.reasonText}>• {reason}</Text>
              ))}
            </View>
          )}
        </View>
        
        <View style={styles.featuresList}>
          <Text style={styles.featuresTitle}>AR Experience Features:</Text>
          
          <View style={styles.featureItem}>
            <FontAwesome5 name="map-marker-alt" size={20} color="#FF5E3A" style={styles.featureIcon} />
            <View style={styles.featureContent}>
              <Text style={styles.featureName}>Geolocated Phillboards</Text>
              <Text style={styles.featureDescription}>
                View digital Phillboards placed in the real world at specific locations
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <FontAwesome5 name="trophy" size={20} color="#FFD700" style={styles.featureIcon} />
            <View style={styles.featureContent}>
              <Text style={styles.featureName}>AR Challenges</Text>
              <Text style={styles.featureDescription}>
                Complete challenges in augmented reality to earn points and rewards
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <MaterialIcons name="3d-rotation" size={24} color="#4A90E2" style={styles.featureIcon} />
            <View style={styles.featureContent}>
              <Text style={styles.featureName}>3D Content</Text>
              <Text style={styles.featureDescription}>
                Interact with 3D objects and content in your environment
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <MaterialIcons name="place" size={24} color="#8BC34A" style={styles.featureIcon} />
            <View style={styles.featureContent}>
              <Text style={styles.featureName}>Create Your Own</Text>
              <Text style={styles.featureDescription}>
                Place your own Phillboards for others to discover
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[
              styles.startButton,
              (!isInitialized || !arSupported) && styles.disabledButton
            ]}
            disabled={!isInitialized || !arSupported}
            onPress={handleStartAR}
          >
            <MaterialIcons name="view-in-ar" size={24} color="white" />
            <Text style={styles.startButtonText}>Start AR Experience</Text>
          </TouchableOpacity>
          
          {Platform.OS !== 'web' && !arSupported && (
            <TouchableOpacity
              style={styles.webButton}
              onPress={openBrowserAR}
            >
              <MaterialIcons name="open-in-browser" size={20} color="white" />
              <Text style={styles.webButtonText}>Try Web AR Instead</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  statusCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statusLabel: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    marginTop: 12,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    padding: 12,
    borderRadius: 8,
  },
  errorText: {
    color: '#F44336',
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: '#F44336',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  reasonsContainer: {
    marginTop: 16,
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    padding: 12,
    borderRadius: 8,
  },
  reasonsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 8,
  },
  reasonText: {
    color: '#555555',
    marginBottom: 4,
  },
  featuresList: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  featureIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666666',
  },
  actionsContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  startButton: {
    backgroundColor: '#FF5E3A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    width: '100%',
    marginBottom: 16,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  webButton: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  webButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  exitButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
    zIndex: 100,
  },
});

export default ARExperienceScreen; 