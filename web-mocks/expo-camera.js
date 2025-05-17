import React from 'react';
import { View, Text } from 'react-native';

// Constants exported from expo-camera
export const Constants = {
  Type: {
    front: 'front',
    back: 'back',
  },
  FlashMode: {
    on: 'on',
    off: 'off',
    auto: 'auto',
    torch: 'torch',
  },
  AutoFocus: {
    on: 'on',
    off: 'off',
  },
  WhiteBalance: {
    auto: 'auto',
    sunny: 'sunny',
    cloudy: 'cloudy',
    shadow: 'shadow',
    fluorescent: 'fluorescent',
    incandescent: 'incandescent',
  },
};

// Mock Camera component
export const Camera = ({ style, type, flashMode, onCameraReady, onMountError, children, ...props }) => {
  React.useEffect(() => {
    if (onCameraReady) {
      setTimeout(onCameraReady, 500);
    }
  }, [onCameraReady]);

  return (
    <View style={[{ backgroundColor: '#000', overflow: 'hidden' }, style]}>
      <Text style={{ color: '#fff', textAlign: 'center', padding: 20 }}>
        Camera Preview (Web Simulation)
      </Text>
      {children}
    </View>
  );
};

// Mock permissions methods
export const getCameraPermissionsAsync = async () => ({ status: 'granted', granted: true });
export const requestCameraPermissionsAsync = async () => ({ status: 'granted', granted: true });

export default {
  Camera,
  Constants,
  getCameraPermissionsAsync,
  requestCameraPermissionsAsync,
}; 