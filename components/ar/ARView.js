import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, Platform, TouchableOpacity } from 'react-native';
import { useAR } from '../../context/ARContext';

// Import Three.js components for web
let Canvas, XR, ARButton, useFrame, useThree, Box, Text3D, Sphere;
if (Platform.OS === 'web') {
  const { Canvas: ThreeCanvas, useFrame: useThreeFrame, useThree: useThreeHook } = require('@react-three/fiber');
  const { XR: ThreeXR, ARButton: ThreeARButton } = require('@react-three/xr');
  const { Box: ThreeBox, Text3D: ThreeText3D, Sphere: ThreeSphere } = require('@react-three/drei');
  
  Canvas = ThreeCanvas;
  XR = ThreeXR;
  ARButton = ThreeARButton;
  useFrame = useThreeFrame;
  useThree = useThreeHook;
  Box = ThreeBox;
  Text3D = ThreeText3D;
  Sphere = ThreeSphere;
}

// Import Viro components for native
let ViroARSceneNavigator, ViroARScene, ViroText, ViroBox, ViroSphere, ViroNode;
if (Platform.OS !== 'web') {
  const ViroReact = require('@reactvision/react-viro');
  ViroARSceneNavigator = ViroReact.ViroARSceneNavigator;
  ViroARScene = ViroReact.ViroARScene;
  ViroText = ViroReact.ViroText;
  ViroBox = ViroReact.ViroBox;
  ViroSphere = ViroReact.ViroSphere;
  ViroNode = ViroReact.ViroNode;
}

// Scene for React Three Fiber (Web)
const WebARScene = ({ arObjects = [] }) => {
  const [position, setPosition] = useState([0, 0, -1]); // Default position in front of the camera
  
  useFrame((state, delta) => {
    // Animation logic here if needed
  });
  
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.5} />
      
      {/* Directional light */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* A sample 3D object */}
      <Box position={position} args={[0.2, 0.2, 0.2]}>
        <meshStandardMaterial color="#FF5E3A" />
      </Box>
      
      {/* Render all AR objects from arObjects array */}
      {arObjects.map(object => (
        <Sphere 
          key={object.id}
          position={[
            (Math.random() - 0.5) * 3, 
            (Math.random() - 0.5) * 2,
            -2 - Math.random() * 3
          ]}
          args={[0.1, 16, 16]}
        >
          <meshStandardMaterial color={object.type === 'challenge' ? '#4A90E2' : '#FF5E3A'} />
        </Sphere>
      ))}
    </>
  );
};

// Scene for Viro AR (Native)
const createViroARScene = ({ arObjects = [] }) => {
  return function NativeARScene(props) {
    const onInitialized = (state, reason) => {
      // Handle AR initialization
      console.log('Viro AR initialized:', state, reason);
    };
    
    return (
      <ViroARScene onTrackingUpdated={onInitialized}>
        {/* Text instruction */}
        <ViroText
          text="Phillboards AR View"
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={{ fontFamily: 'Arial', fontSize: 20, color: 'white', textAlignVertical: 'center', textAlign: 'center' }}
        />
        
        {/* A sample 3D box */}
        <ViroBox
          position={[0, -0.5, -1]}
          scale={[0.3, 0.3, 0.3]}
          materials={['boxMaterial']}
        />
        
        {/* Render all AR objects from arObjects array */}
        {arObjects.map(object => (
          <ViroNode
            key={object.id}
            position={[
              (Math.random() - 0.5) * 3,
              (Math.random() - 0.5) * 2,
              -2 - Math.random() * 3
            ]}
          >
            <ViroSphere
              radius={0.1}
              materials={[object.type === 'challenge' ? 'challengeMaterial' : 'regularMaterial']}
            />
            <ViroText
              text={object.content || object.type}
              scale={[0.2, 0.2, 0.2]}
              position={[0, 0.15, 0]}
              style={{ fontFamily: 'Arial', fontSize: 10, color: 'white', textAlignVertical: 'center', textAlign: 'center' }}
            />
          </ViroNode>
        ))}
      </ViroARScene>
    );
  };
};

// Main AR View component
const ARView = () => {
  const {
    isInitialized,
    isInitializing,
    initializationError,
    arObjects,
    startARView,
    stopARView,
    retryInitialization,
    location,
    getNearbyARObjects,
  } = useAR();
  
  const [nearbyObjects, setNearbyObjects] = useState([]);
  const containerRef = useRef(null);
  const [arSupported, setArSupported] = useState(false);
  
  // Check AR support on mount
  useEffect(() => {
    const checkSupport = async () => {
      try {
        if (Platform.OS === 'web') {
          // For web, check if the browser supports WebXR
          const supported = navigator && navigator.xr && await navigator.xr.isSessionSupported('immersive-ar');
          setArSupported(!!supported);
        } else {
          // For native, we'll assume it's supported if we got this far
          setArSupported(true);
        }
      } catch (error) {
        console.error('Error checking AR support:', error);
        setArSupported(false);
      }
    };
    
    checkSupport();
  }, []);
  
  // Fetch nearby AR objects when location changes
  useEffect(() => {
    if (location) {
      const fetchNearbyObjects = async () => {
        const objects = await getNearbyARObjects(500); // 500 meters radius
        setNearbyObjects(objects);
      };
      
      fetchNearbyObjects();
    }
  }, [location, getNearbyARObjects]);
  
  // Handle initialization retry
  const handleRetry = () => {
    retryInitialization();
  };
  
  // Render loading state
  if (isInitializing) {
    return (
      <View style={styles.container}>
        <Text style={styles.statusText}>Initializing AR...</Text>
      </View>
    );
  }
  
  // Render error state
  if (initializationError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {initializationError}</Text>
        <Button title="Retry" onPress={handleRetry} />
      </View>
    );
  }
  
  // Render unsupported state
  if (!arSupported) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>AR is not supported on this device</Text>
      </View>
    );
  }
  
  // Render the AR scene based on platform
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container} ref={containerRef}>
        <Canvas style={styles.canvas}>
          <XR>
            <WebARScene arObjects={nearbyObjects} />
          </XR>
        </Canvas>
        <View style={styles.arButtonContainer}>
          <ARButton />
        </View>
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>
            AR Objects Nearby: {nearbyObjects.length}
          </Text>
        </View>
      </View>
    );
  } else {
    // For native platforms
    const NativeARScene = createViroARScene({ arObjects: nearbyObjects });
    
    return (
      <View style={styles.container}>
        <ViroARSceneNavigator
          initialScene={{
            scene: NativeARScene,
          }}
          style={styles.arView}
        />
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>
            AR Objects Nearby: {nearbyObjects.length}
          </Text>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => {
              // Navigation logic to go back
            }}
          >
            <Text style={styles.closeButtonText}>Close AR</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

// Component styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  canvas: {
    flex: 1,
  },
  arView: {
    flex: 1,
  },
  statusText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: '#FF5E3A',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  overlay: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    padding: 10,
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 5,
  },
  arButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FF5E3A',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ARView; 