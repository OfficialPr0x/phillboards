import React from 'react';
import { View, Text } from 'react-native';

// Mock ViroARSceneNavigator component
export const ViroARSceneNavigator = ({ initialScene, style, ...props }) => {
  return (
    <View style={[{ flex: 1, backgroundColor: '#222' }, style]}>
      <Text style={{ color: '#fff', textAlign: 'center', padding: 20 }}>
        AR View (Web Simulation)
      </Text>
      {initialScene && initialScene.scene && React.createElement(initialScene.scene, props)}
    </View>
  );
};

// Mock ViroARScene component
export const ViroARScene = ({ children, onTrackingUpdated, ...props }) => {
  React.useEffect(() => {
    if (onTrackingUpdated) {
      onTrackingUpdated('TRACKING_NORMAL');
    }
  }, [onTrackingUpdated]);

  return (
    <View style={{ flex: 1 }}>
      {children}
    </View>
  );
};

// Mock ViroText component
export const ViroText = ({ text, position, scale, style, ...props }) => {
  const [x, y, z] = position || [0, 0, 0];
  const [scaleX, scaleY, scaleZ] = scale || [1, 1, 1];

  return (
    <Text
      style={{
        position: 'absolute',
        left: `${(x + 1) * 50}%`,
        top: `${(y + 1) * 50}%`,
        transform: [
          { translateX: -50 },
          { translateY: -50 },
          { scale: scaleX }
        ],
        color: style?.color || '#fff',
        ...style,
      }}
      {...props}
    >
      {text}
    </Text>
  );
};

// Mock ViroBox component
export const ViroBox = ({ position, scale, materials, ...props }) => {
  const [x, y, z] = position || [0, 0, 0];
  const [scaleX, scaleY, scaleZ] = scale || [1, 1, 1];

  return (
    <View
      style={{
        position: 'absolute',
        left: `${(x + 1) * 50}%`,
        top: `${(y + 1) * 50}%`,
        width: 50 * scaleX,
        height: 50 * scaleY,
        backgroundColor: '#4A90E2',
        transform: [
          { translateX: -25 },
          { translateY: -25 },
        ],
      }}
      {...props}
    />
  );
};

// Mock ViroSphere component
export const ViroSphere = ({ position, radius, materials, ...props }) => {
  const [x, y, z] = position || [0, 0, 0];

  return (
    <View
      style={{
        position: 'absolute',
        left: `${(x + 1) * 50}%`,
        top: `${(y + 1) * 50}%`,
        width: radius * 100,
        height: radius * 100,
        borderRadius: radius * 50,
        backgroundColor: '#4CAF50',
        transform: [
          { translateX: -radius * 50 },
          { translateY: -radius * 50 },
        ],
      }}
      {...props}
    />
  );
};

// Mock ViroNode component
export const ViroNode = ({ position, children, ...props }) => {
  const [x, y, z] = position || [0, 0, 0];

  return (
    <View
      style={{
        position: 'absolute',
        left: `${(x + 1) * 50}%`,
        top: `${(y + 1) * 50}%`,
        transform: [
          { translateX: -50 },
          { translateY: -50 },
        ],
      }}
      {...props}
    >
      {children}
    </View>
  );
};

// Mock ViroMaterials
export const ViroMaterials = {
  createMaterials: () => {},
};

// Mock ViroAnimations
export const ViroAnimations = {
  registerAnimations: () => {},
};

// Mock ViroConstants
export const ViroConstants = {
  TRACKING_NORMAL: 'TRACKING_NORMAL',
  TRACKING_NONE: 'TRACKING_NONE',
  TRACKING_LIMITED: 'TRACKING_LIMITED',
};

// Export all components
export default {
  ViroARSceneNavigator,
  ViroARScene,
  ViroText,
  ViroBox,
  ViroSphere,
  ViroNode,
  ViroMaterials,
  ViroAnimations,
  ViroConstants,
}; 