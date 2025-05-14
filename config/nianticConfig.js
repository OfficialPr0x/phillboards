import { Platform } from 'react-native';

// TODO: Replace with your actual Niantic Lightship API key from developer.lightship.dev
const API_KEY = 'lskey_c6fc48a5a2e8ef12345678901234567890123456';

const nianticConfig = {
  apiKey: API_KEY,
  // Configure features needed for the app
  features: {
    meshing: true,
    semantics: true,
    depthEstimation: true,
    persistentAnchors: true,
    sharedAR: true
  },
  // Default options for AR session
  defaultARSessionOptions: {
    // Shared AR features - for multi-user experience
    sharedAROptions: {
      usePersistentAnchors: true,
      useNetcode: true,
      maxUsers: 5,
    },
    // Meshing options for object placement
    meshingOptions: {
      enabled: true,
      targetFrameRate: 10,
      meshingTargetFrameRate: Platform.OS === 'ios' ? 10 : 5,
    },
    // Depth and occlusion options for realistic AR
    depthOptions: {
      enabled: true,
      targetFrameRate: 30,
    },
    // Semantic understanding for intelligent object placement
    semanticOptions: {
      enabled: true,
      targetFrameRate: 10,
    }
  }
};

export default nianticConfig; 