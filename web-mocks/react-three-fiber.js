import React from 'react';
import { View, Text } from 'react-native';

// Mock Canvas component from @react-three/fiber
export const Canvas = ({ children, style, ...props }) => {
  return (
    <View 
      style={[
        { 
          position: 'relative',
          width: '100%', 
          height: '100%',
          backgroundColor: '#222', 
          borderRadius: 8,
          overflow: 'hidden'
        }, 
        style
      ]} 
      {...props}
    >
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{ color: '#fff', fontSize: 16, marginBottom: 10 }}>
          3D AR Canvas (Web Simulation)
        </Text>
      </View>
      {/* Simply render children in a container */}
      <View style={{ position: 'relative', width: '100%', height: '100%' }}>
        {children}
      </View>
    </View>
  );
};

// Mock Text3D component from @react-three/drei
export const Text3D = ({ children, position, color, fontSize, ...props }) => {
  const positionStyle = position ? {
    left: `${(position[0] + 1) * 50}%`,
    top: `${(1 - position[1]) * 50}%`,
    zIndex: Math.floor((position[2] + 1) * 100),
  } : {};

  return (
    <View
      style={{
        position: 'absolute',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        ...positionStyle
      }}
      {...props}
    >
      <Text style={{ color: color || '#fff', fontSize: fontSize || 16 }}>
        {children}
      </Text>
    </View>
  );
};

// Mock OrbitControls from @react-three/drei
export const OrbitControls = ({ enableZoom, autoRotate, ...props }) => {
  return null; // OrbitControls don't render anything visible
};

// Export all components as named exports for @react-three/drei
export const Box = ({ position, size, color, ...props }) => {
  const positionStyle = position ? {
    left: `${(position[0] + 1) * 50}%`,
    top: `${(1 - position[1]) * 50}%`,
    zIndex: Math.floor((position[2] + 1) * 100),
  } : {};
  
  const sizeX = size?.[0] || 1;
  const sizeY = size?.[1] || 1;
  const sizeZ = size?.[2] || 1;
  
  return (
    <View
      style={{
        position: 'absolute',
        width: sizeX * 30,
        height: sizeY * 30,
        backgroundColor: color || '#ff0000',
        borderRadius: 4,
        ...positionStyle,
        transform: [{ translateX: -sizeX * 15 }, { translateY: -sizeY * 15 }],
      }}
      {...props}
    />
  );
};

// Add Sphere component
export const Sphere = ({ position, radius, color, ...props }) => {
  const positionStyle = position ? {
    left: `${(position[0] + 1) * 50}%`,
    top: `${(1 - position[1]) * 50}%`,
    zIndex: Math.floor((position[2] + 1) * 100),
  } : {};
  
  const size = radius || 0.5;
  
  return (
    <View
      style={{
        position: 'absolute',
        width: size * 50,
        height: size * 50,
        backgroundColor: color || '#4A90E2',
        borderRadius: size * 25,
        ...positionStyle,
        transform: [{ translateX: -size * 25 }, { translateY: -size * 25 }],
      }}
      {...props}
    />
  );
};

// Mock XR and ARButton for WebXR
export const XR = ({ children }) => {
  return <>{children}</>;
};

export const ARButton = () => {
  return (
    <View 
      style={{
        backgroundColor: '#4A90E2',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
      }}
    >
      <Text style={{ color: 'white', fontWeight: 'bold' }}>Enter AR</Text>
    </View>
  );
};

// Other components can be added as needed 