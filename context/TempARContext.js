import React, { createContext, useState, useEffect, useContext } from 'react';
import { Alert, Platform } from 'react-native';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';

// Import UI components for use in AR
let ui;
try {
  ui = require('../components/ui');
} catch (error) {
  console.warn("TempARContext: Failed to import UI components:", error.message);
  ui = {};
}

// Create context for temporary AR functionality
const TempARContext = createContext(null);

// Hook to use the AR context
export const useTempAR = () => useContext(TempARContext);

export const TempARProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [initializationError, setInitializationError] = useState(null);
  const [location, setLocation] = useState(null);
  const [anchors, setAnchors] = useState([]);
  const [cameraRef, setCameraRef] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  // Initialize the AR session
  useEffect(() => {
    initARSession();
    
    return () => {
      // Cleanup on unmount
      // Nothing to dispose for now
    };
  }, []);

  // Request necessary permissions
  const requestPermissions = async () => {
    try {
      // For web platform, mock the permissions and location
      if (Platform.OS === 'web') {
        setHasPermission(true);
        setLocation({
          coords: {
            latitude: 37.7749,
            longitude: -122.4194,
            altitude: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            heading: 0,
            speed: 0
          },
          timestamp: Date.now()
        });
        return true;
      }
      
      // Request camera permission
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      
      // Request location permission
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      
      if (cameraStatus !== 'granted' || locationStatus !== 'granted') {
        setHasPermission(false);
        setInitializationError('Camera or location permission denied');
        return false;
      }
      
      setHasPermission(true);
      
      // Get current location
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      
      return true;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      setInitializationError('Failed to request permissions: ' + error.message);
      return false;
    }
  };

  // Initialize the AR session
  const initARSession = async () => {
    try {
      setIsInitializing(true);
      
      // Request permissions
      const permissionsGranted = await requestPermissions();
      
      if (!permissionsGranted) {
        setIsInitialized(false);
        setIsInitializing(false);
        return;
      }
      
      // Mock successful initialization
      setIsInitialized(true);
      setIsInitializing(false);
      
      console.log('Temporary AR session initialized successfully');
    } catch (error) {
      console.error('Failed to initialize AR session:', error);
      setInitializationError('Failed to initialize AR: ' + error.message);
      setIsInitialized(false);
      setIsInitializing(false);
      Alert.alert('AR Initialization Error', 'Could not initialize AR session. Please restart the app.');
    }
  };

  // Retry initialization if it failed
  const retryInitialization = async () => {
    setInitializationError(null);
    setIsInitializing(true);
    await initARSession();
  };

  // Place a phillboard anchor at the current position with message
  const placePhillboardAnchor = async (message, template) => {
    if (!isInitialized || !location) return null;
    
    try {
      // Generate a unique ID for the anchor
      const anchorId = 'anchor_' + Date.now();
      
      // Create a new anchor with the provided message and template
      const newAnchor = {
        identifier: anchorId,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        position: { x: 0, y: 0, z: -1 }, // Default position in front of camera
        rotation: { x: 0, y: 0, z: 0, w: 1 }, // Default rotation
        metadata: {
          type: 'phillboard',
          message: message,
          template: template,
          createdAt: new Date().toISOString(),
          createdBy: 'current_user', // In a real app, use actual user ID
          likes: 0
        }
      };
      
      // Add to anchors list
      setAnchors(prevAnchors => [...prevAnchors, newAnchor]);
      
      // Store in local storage (would use AsyncStorage in a real implementation)
      // For now, we're just keeping them in memory
      
      return newAnchor;
    } catch (error) {
      console.error('Error placing phillboard anchor:', error);
      return null;
    }
  };

  // Get nearby phillboard anchors
  const getNearbyPhillboards = async (radiusInMeters = 100) => {
    // For web environment, always return sample data
    if (Platform.OS === 'web') {
      const sampleLatitude = location?.coords.latitude || 37.7749;
      const sampleLongitude = location?.coords.longitude || -122.4194;
      
      return [
        {
          id: 'web_sample_1',
          latitude: sampleLatitude + (Math.random() - 0.5) * 0.02,
          longitude: sampleLongitude + (Math.random() - 0.5) * 0.02,
          title: 'Demo Phillboard 1',
          message: 'This is a web-demo phillboard',
          template: 'standard',
          points: 100,
          visitors: 25,
          likes: 12,
          type: 'regular',
          createdAt: new Date().toISOString(),
          createdBy: 'web_user',
          distance: 150
        },
        {
          id: 'web_sample_2',
          latitude: sampleLatitude + (Math.random() - 0.5) * 0.02,
          longitude: sampleLongitude + (Math.random() - 0.5) * 0.02,
          title: 'Challenge Phillboard',
          message: 'Complete this web challenge!',
          template: 'challenge',
          points: 150,
          visitors: 15,
          likes: 8,
          type: 'challenge',
          createdAt: new Date().toISOString(),
          createdBy: 'web_user',
          distance: 320
        },
        {
          id: 'web_sample_3',
          latitude: sampleLatitude + (Math.random() - 0.5) * 0.02,
          longitude: sampleLongitude + (Math.random() - 0.5) * 0.02,
          title: 'Bonus Phillboard',
          message: 'You found a bonus board!',
          template: 'bonus',
          points: 75,
          visitors: 8,
          likes: 4,
          type: 'bonus',
          createdAt: new Date().toISOString(),
          createdBy: 'web_user',
          distance: 210
        }
      ];
    }
    
    // For native platforms
    if (!isInitialized || !location) return [];
    
    try {
      // In a real implementation, we would filter anchors by distance
      // For now, return all anchors with added display properties
      return anchors
        .filter(anchor => anchor.metadata && anchor.metadata.type === 'phillboard')
        .map(anchor => {
          // Calculate distance (simplified)
          const distance = calculateDistance(
            location.coords.latitude, 
            location.coords.longitude,
            anchor.latitude,
            anchor.longitude
          );
          
          // Only include if within radius
          if (distance <= radiusInMeters) {
            return {
              id: anchor.identifier,
              latitude: anchor.latitude,
              longitude: anchor.longitude,
              title: anchor.metadata.message.substring(0, 20) + (anchor.metadata.message.length > 20 ? '...' : ''),
              message: anchor.metadata.message,
              template: anchor.metadata.template,
              points: 100, // Default points value
              visitors: Math.floor(Math.random() * 30), // In a real app, track actual visitors
              likes: anchor.metadata.likes || 0,
              type: 'regular', // Default type
              createdAt: anchor.metadata.createdAt,
              createdBy: anchor.metadata.createdBy,
              distance: Math.round(distance)
            };
          }
          return null;
        })
        .filter(Boolean); // Remove nulls
    } catch (error) {
      console.error('Error getting nearby phillboards:', error);
      return [];
    }
  };

  // Calculate distance between two points in meters
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth radius in meters
    const phi1 = lat1 * Math.PI/180;
    const phi2 = lat2 * Math.PI/180;
    const deltaPhi = (lat2-lat1) * Math.PI/180;
    const deltaLambda = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  // Update a phillboard (e.g., add like)
  const updatePhillboard = async (phillboardId, updates) => {
    try {
      // Find the anchor by ID
      const anchorIndex = anchors.findIndex(a => a.identifier === phillboardId);
      if (anchorIndex === -1) return false;
      
      // Update the anchor metadata
      const updatedAnchors = [...anchors];
      updatedAnchors[anchorIndex] = {
        ...updatedAnchors[anchorIndex],
        metadata: {
          ...updatedAnchors[anchorIndex].metadata,
          ...updates
        }
      };
      
      setAnchors(updatedAnchors);
      
      return true;
    } catch (error) {
      console.error('Error updating phillboard:', error);
      return false;
    }
  };

  // Check if a surface is detected (simplified)
  const checkForValidSurface = async () => {
    // In a real implementation, this would use AR capabilities
    // For now, always return true after a short delay
    return new Promise(resolve => {
      setTimeout(() => resolve(true), 500);
    });
  };

  const value = {
    isInitialized,
    isInitializing,
    initializationError,
    retryInitialization,
    location,
    anchors,
    hasPermission,
    cameraRef,
    setCameraRef,
    placePhillboardAnchor,
    getNearbyPhillboards,
    updatePhillboard,
    checkForValidSurface
  };

  return (
    <TempARContext.Provider value={value}>
      {children}
    </TempARContext.Provider>
  );
};