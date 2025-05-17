// Mock expo-location for web
const DEFAULT_LOCATION = {
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
};

export async function requestForegroundPermissionsAsync() {
  return { status: 'granted' };
}

export async function requestBackgroundPermissionsAsync() {
  return { status: 'granted' };
}

export async function getCurrentPositionAsync() {
  return DEFAULT_LOCATION;
}

export async function getLastKnownPositionAsync() {
  return DEFAULT_LOCATION;
}

export function watchPositionAsync(options, callback) {
  // Call callback immediately with default location
  callback(DEFAULT_LOCATION);
  
  // Return a fake subscription with unsubscribe method
  return {
    remove: () => {}
  };
}

export const LocationAccuracy = {
  Balanced: 3,
  High: 4,
  Highest: 5,
  Low: 1,
  Lowest: 0
};

export const LocationActivityType = {
  Fitness: 1,
  Other: 0,
  Other_Navigation: 2 
};

export const LocationGeofencingEventType = {
  Enter: 1,
  Exit: 2
};

export const LocationGeofencingRegionState = {
  Inside: 1,
  Outside: 2,
  Unknown: 0
};

export default {
  requestForegroundPermissionsAsync,
  requestBackgroundPermissionsAsync,
  getCurrentPositionAsync,
  getLastKnownPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
  LocationActivityType,
  LocationGeofencingEventType,
  LocationGeofencingRegionState
}; 