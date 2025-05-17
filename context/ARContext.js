import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import * as Location from 'expo-location';

// Import UI components for use in AR
let ui;
try {
  ui = require('../components/ui');
} catch (error) {
  console.warn("ARContext: Failed to import UI components:", error.message);
  ui = {};
}

// Import AR frameworks based on platform
let ViroARSceneNavigator, ViroMaterials, ViroAnimations, ViroARScene, ViroText, ViroConstants;
if (Platform.OS !== 'web') {
  // Import Viro React for native mobile platforms
  const ViroReact = require('@reactvision/react-viro');
  ViroARSceneNavigator = ViroReact.ViroARSceneNavigator;
  ViroMaterials = ViroReact.ViroMaterials;
  ViroAnimations = ViroReact.ViroAnimations;
  ViroARScene = ViroReact.ViroARScene;
  ViroText = ViroReact.ViroText;
  ViroConstants = ViroReact.ViroConstants;
}

// Create context
const ARContext = createContext(null);

// Hook to access AR context
export const useAR = () => useContext(ARContext);

export const ARProvider = ({ children }) => {
  // State variables
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [initializationError, setInitializationError] = useState(null);
  const [location, setLocation] = useState(null);
  const [arObjects, setArObjects] = useState([]);
  const [arView, setArView] = useState(null);
  const [trackingStatus, setTrackingStatus] = useState('UNKNOWN');

  // Initialize AR when component mounts
  useEffect(() => {
    initializeAR();
    return () => {
      // Cleanup for AR session
      cleanupAR();
    };
  }, []);

  // Initialize location tracking
  useEffect(() => {
    startLocationTracking();
    return () => {
      stopLocationTracking();
    };
  }, []);

  // Setup location tracking
  const startLocationTracking = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setInitializationError('Location permission is required for AR features');
        return;
      }

      // Start watching position
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.LocationAccuracy.High,
          distanceInterval: 1, // Update every 1 meter
          timeInterval: 10000 // Or every 10 seconds
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );

      return locationSubscription;
    } catch (error) {
      console.error('Error starting location tracking:', error);
      setInitializationError('Failed to initialize location services');
    }
  };

  // Stop location tracking
  const stopLocationTracking = () => {
    // Implement cleanup for location tracking here
  };

  // Initialize the AR system
  const initializeAR = async () => {
    try {
      setIsInitializing(true);

      if (Platform.OS === 'web') {
        // Web AR initialization with Three.js/React Three Fiber
        // This is a simplified initialization for web
        console.log('Initializing Web AR experience');
        
        // In a real implementation, you'd initialize WebXR here
        // For demo purposes, we'll simulate successful initialization
        setIsInitialized(true);
      } else {
        // Native AR initialization with ViroReact
        console.log('Initializing Native AR experience');
        
        // In a real implementation, you'd initialize ARCore/ARKit via ViroReact
        // For now, we'll simulate successful initialization
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsInitialized(true);
      }

      // Get initial location
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.High
      });
      setLocation(currentLocation);

      setIsInitialized(true);
      setIsInitializing(false);
    } catch (error) {
      console.error('Error initializing AR:', error);
      setInitializationError(error.message || 'Failed to initialize AR experience');
      setIsInitialized(false);
      setIsInitializing(false);
      Alert.alert('AR Initialization Error', 'Could not initialize AR session. Please try again.');
    }
  };

  // Cleanup AR resources
  const cleanupAR = () => {
    // Cleanup code for AR resources
    console.log('Cleaning up AR resources');
  };

  // Retry initialization if it failed
  const retryInitialization = async () => {
    setInitializationError(null);
    setIsInitializing(true);
    await initializeAR();
  };

  // Create an AR object at the current location
  const createARObject = async (type, content, options = {}) => {
    if (!isInitialized || !location) {
      Alert.alert('AR Not Ready', 'AR system is not fully initialized yet.');
      return null;
    }

    try {
      // Generate a unique ID
      const objectId = `ar-object-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      // Create object data
      const newObject = {
        id: objectId,
        type,
        content,
        options,
        position: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          altitude: location.coords.altitude || 0,
        },
        createdAt: new Date().toISOString(),
      };
      
      // Add to state
      setArObjects(prev => [...prev, newObject]);
      
      return newObject;
    } catch (error) {
      console.error('Error creating AR object:', error);
      Alert.alert('Error', 'Failed to create AR object');
      return null;
    }
  };

  // Get nearby AR objects
  const getNearbyARObjects = async (radiusInMeters = 100) => {
    if (!location) return [];
    
    // Filter objects by distance
    // In a real app, this would query a backend service
    return arObjects.filter(obj => {
      const distance = calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        obj.position.latitude,
        obj.position.longitude
      );
      return distance <= radiusInMeters;
    });
  };

  // Calculate distance between coordinates in meters
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
    
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  // Start AR view
  const startARView = (containerRef) => {
    if (!isInitialized) {
      Alert.alert('AR Not Ready', 'AR system is not fully initialized yet.');
      return;
    }

    setArView({
      active: true,
      containerRef,
    });
  };

  // Stop AR view
  const stopARView = () => {
    setArView({
      active: false,
      containerRef: null,
    });
  };

  // Check if we're in an area with AR support
  const checkARSupport = async () => {
    if (Platform.OS === 'web') {
      // Check WebXR support
      return navigator && navigator.xr && navigator.xr.isSessionSupported('immersive-ar');
    } else {
      // For native, we'd check ARCore/ARKit availability
      // This is a simplified check
      return Promise.resolve(true);
    }
  };

  // Context value
  const contextValue = {
    isInitialized,
    isInitializing,
    initializationError,
    location,
    trackingStatus,
    retryInitialization,
    createARObject,
    getNearbyARObjects,
    startARView,
    stopARView,
    arView,
    checkARSupport,
  };

  return (
    <ARContext.Provider value={contextValue}>
      {children}
    </ARContext.Provider>
  );
};

export default ARContext; 