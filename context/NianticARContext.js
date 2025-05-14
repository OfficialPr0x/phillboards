import React, { createContext, useContext } from 'react';

// Create a mock context for Niantic AR
const NianticARContext = createContext(null);

// Mock hook that returns empty values
export const useNianticAR = () => {
  return {
    isInitialized: false,
    isInitializing: false,
    initializationError: 'Niantic AR is not available in temporary AR mode',
    retryInitialization: () => console.log('Niantic AR retry not available in temporary mode'),
    sessionManager: null,
    sharedARSession: null,
    isLocalizing: false,
    isLocalized: false,
    location: null,
    anchors: [],
    localizeAtVpsLocation: async () => false,
    placePhillboardAnchor: async () => null,
    getNearbyPhillboards: async () => [],
    updatePhillboard: async () => false,
    shareARSession: async () => null
  };
};

// Mock provider component
export const NianticARProvider = ({ children }) => {
  return (
    <NianticARContext.Provider value={{}}>
      {children}
    </NianticARContext.Provider>
  );
};

export default NianticARContext; 