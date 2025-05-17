# Niantic 8th Wall Integration Guide for Phillboard

This guide will walk you through setting up Niantic's 8th Wall platform for the Phillboard application, including VPS (Visual Positioning System) integration for real-world anchoring of AR content.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setting Up Niantic Developer Account](#setting-up-niantic-developer-account)
3. [Creating an 8th Wall Project](#creating-an-8th-wall-project)
4. [Setting Up VPS Locations](#setting-up-vps-locations)
5. [Integrating 8th Wall with React Native](#integrating-8th-wall-with-react-native)
6. [Testing Anchor Placement](#testing-anchor-placement)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

- Niantic Lightship/8th Wall developer account (sign up at [8thwall.com](https://www.8thwall.com))
- React Native development environment
- Phillboard application codebase
- Mobile device with ARCore (Android) or ARKit (iOS) support

## Setting Up Niantic Developer Account

1. Sign up for a Niantic Lightship/8th Wall developer account
2. Complete the verification process
3. Navigate to the developer dashboard
4. Create an API key for your application

## Creating an 8th Wall Project

1. In the 8th Wall dashboard, click "Create Project"
2. Select "WebAR" as the project type
3. Name your project "Phillboard"
4. Configure project settings:
   - Enable "World Tracking"
   - Enable "Image Targets" (optional for future features)
   - Enable "Ground Plane Detection"
   - Enable "Visual Positioning System (VPS)"
5. Click "Create Project"
6. Copy your project API key for later use

## Setting Up VPS Locations

### Creating VPS Locations

1. In your 8th Wall project, navigate to "VPS" in the left sidebar
2. Click "Create Location"
3. For demo purposes, create 2-3 locations:
   - Times Square, New York
   - Venice Beach, Los Angeles
   - Tokyo Shibuya Crossing
4. For each location:
   - Upload at least 20-30 high-quality images from different angles
   - Ensure good lighting and distinctive features in the images
   - Add metadata like GPS coordinates and location name
5. Wait for the VPS processing to complete (this may take several hours)

### Testing VPS Locations

1. Once processing is complete, use the 8th Wall app to test each location
2. Verify that the anchors are stable and accurately positioned
3. Make adjustments as needed

## Integrating 8th Wall with React Native

### Installation

1. Create a config file for Niantic integration:

```javascript
// config/nianticConfig.js
export default {
  apiKey: 'YOUR_8THWALL_API_KEY',
  vpsLocations: [
    {
      id: 'times-square',
      name: 'Times Square',
      latitude: 40.7580,
      longitude: -73.9855,
    },
    {
      id: 'venice-beach',
      name: 'Venice Beach',
      latitude: 33.9850,
      longitude: -118.4695,
    },
    {
      id: 'shibuya-crossing',
      name: 'Shibuya Crossing',
      latitude: 35.6595,
      longitude: 139.7004,
    },
  ],
};
```

2. Create a React Native WebView component to load the 8th Wall experience:

```jsx
// components/NianticARView.js
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import nianticConfig from '../config/nianticConfig';

const NianticARView = ({ onARSceneReady, onAnchorPlaced, onError }) => {
  const webViewRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Communication from React Native to WebView
  const sendMessageToAR = (message) => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        window.dispatchEvent(new CustomEvent('reactNativeMessage', { detail: ${JSON.stringify(message)} }));
        true;
      `);
    }
  };

  // Handle messages from WebView
  const handleWebViewMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      
      switch (data.type) {
        case 'AR_SCENE_READY':
          setIsLoaded(true);
          onARSceneReady && onARSceneReady();
          break;
        case 'ANCHOR_PLACED':
          onAnchorPlaced && onAnchorPlaced(data.payload);
          break;
        case 'ERROR':
          onError && onError(data.payload);
          break;
        default:
          console.log('Unknown message from AR:', data);
      }
    } catch (error) {
      console.error('Error parsing WebView message:', error);
    }
  };

  // Generate the HTML content for the 8th Wall experience
  const generateARHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
          <title>Phillboard AR</title>
          <style>
            body, html {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
            }
            #ar-scene {
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
            }
          </style>
          <!-- 8th Wall Web SDK -->
          <script src="https://apps.8thwall.com/xrweb?appKey=${nianticConfig.apiKey}"></script>
        </head>
        <body>
          <div id="ar-scene"></div>
          <script>
            // Initialize 8th Wall
            window.XR8 ? XR8.addCameraPipelineModule(XR8.GlTextureRenderer.pipelineModule()) : null;
            window.XRExtras ? XRExtras.Loading.showLoading({onxrloaded}) : null;
            
            function onxrloaded() {
              // Send message to React Native that AR is ready
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'AR_SCENE_READY'
              }));
              
              // Initialize AR scene
              const canvas = document.createElement('canvas')
              document.getElementById('ar-scene').appendChild(canvas)
              
              // Start AR
              XR8.XrController.configure({
                disableWorldTracking: false,
                enableVps: true,
              });
              
              XR8.addCameraPipelineModules([
                XR8.GlTextureRenderer.pipelineModule(),
                XR8.Threejs.pipelineModule(),
                XR8.XrController.pipelineModule(),
                XRExtras.AlmostThere.pipelineModule(),
                XRExtras.Loading.pipelineModule(),
                XRExtras.RuntimeError.pipelineModule(),
              ]);
              
              // Handle messages from React Native
              window.addEventListener('reactNativeMessage', (event) => {
                const message = event.detail;
                
                switch (message.action) {
                  case 'PLACE_PHILLBOARD':
                    placeBillboard(message.data);
                    break;
                  case 'UPDATE_PHILLBOARD':
                    updateBillboard(message.data);
                    break;
                  case 'REMOVE_PHILLBOARD':
                    removeBillboard(message.data);
                    break;
                }
              });
              
              // Initialize Three.js scene
              const {scene, camera} = XR8.Threejs.xrScene()
              
              // Function to place a billboard in AR
              function placeBillboard(data) {
                const {id, content, position, rotation} = data;
                
                // Create billboard mesh
                const geometry = new THREE.PlaneGeometry(1, 0.5);
                const material = new THREE.MeshBasicMaterial({
                  color: 0xFF5E3A,
                  side: THREE.DoubleSide
                });
                const billboard = new THREE.Mesh(geometry, material);
                
                // Position the billboard
                if (position) {
                  billboard.position.set(position.x, position.y, position.z);
                } else {
                  // Place in front of camera if no position specified
                  billboard.position.set(0, 0, -2);
                  billboard.lookAt(camera.position);
                }
                
                if (rotation) {
                  billboard.rotation.set(rotation.x, rotation.y, rotation.z);
                }
                
                billboard.name = id;
                scene.add(billboard);
                
                // Add text to billboard
                const canvas = document.createElement('canvas');
                canvas.width = 512;
                canvas.height = 256;
                const context = canvas.getContext('2d');
                context.fillStyle = '#FF5E3A';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.fillStyle = 'white';
                context.font = '24px Arial';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(content, canvas.width / 2, canvas.height / 2);
                
                const texture = new THREE.CanvasTexture(canvas);
                billboard.material.map = texture;
                billboard.material.needsUpdate = true;
                
                // Add pulse animation
                const initialScale = billboard.scale.clone();
                let pulseTime = 0;
                
                function animatePulse() {
                  pulseTime += 0.05;
                  const scale = 1 + Math.sin(pulseTime) * 0.05;
                  billboard.scale.set(
                    initialScale.x * scale,
                    initialScale.y * scale,
                    initialScale.z * scale
                  );
                  requestAnimationFrame(animatePulse);
                }
                
                animatePulse();
                
                // Send placement confirmation back to React Native
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'ANCHOR_PLACED',
                  payload: {
                    id,
                    position: billboard.position,
                    rotation: billboard.rotation
                  }
                }));
              }
              
              // Function to update a billboard
              function updateBillboard(data) {
                const {id, content} = data;
                const billboard = scene.getObjectByName(id);
                
                if (billboard) {
                  // Update text
                  const material = billboard.material;
                  const canvas = document.createElement('canvas');
                  canvas.width = 512;
                  canvas.height = 256;
                  const context = canvas.getContext('2d');
                  context.fillStyle = '#FF5E3A';
                  context.fillRect(0, 0, canvas.width, canvas.height);
                  context.fillStyle = 'white';
                  context.font = '24px Arial';
                  context.textAlign = 'center';
                  context.textBaseline = 'middle';
                  context.fillText(content, canvas.width / 2, canvas.height / 2);
                  
                  material.map = new THREE.CanvasTexture(canvas);
                  material.needsUpdate = true;
                }
              }
              
              // Function to remove a billboard
              function removeBillboard(data) {
                const {id} = data;
                const billboard = scene.getObjectByName(id);
                
                if (billboard) {
                  scene.remove(billboard);
                }
              }
              
              // Handle screen touches for placing billboards
              canvas.addEventListener('touchstart', (event) => {
                // Convert touch to raycaster
                const touch = event.touches[0];
                const rect = canvas.getBoundingClientRect();
                const x = (touch.clientX - rect.left) / rect.width * 2 - 1;
                const y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
                
                const raycaster = new THREE.Raycaster();
                raycaster.setFromCamera({x, y}, camera);
                
                // Create hit test
                const hits = XR8.XrController.hitTest(touch.clientX, touch.clientY);
                
                if (hits.length > 0) {
                  const hit = hits[0];
                  
                  // Send hit test result to React Native
                  window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'TOUCH_LOCATION',
                    payload: {
                      position: {
                        x: hit.position.x,
                        y: hit.position.y,
                        z: hit.position.z
                      },
                      rotation: {
                        x: hit.rotation.x,
                        y: hit.rotation.y,
                        z: hit.rotation.z
                      }
                    }
                  }));
                }
              });
              
              // Start XR
              XR8.run({canvas});
            }
          </script>
        </body>
      </html>
    `;
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: generateARHTML() }}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        onMessage={handleWebViewMessage}
        allowFileAccess={true}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
        mixedContentMode="always"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default NianticARView;
```

3. Create a context for managing the AR state:

```jsx
// context/NianticARContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';

const NianticARContext = createContext();

export const useNianticAR = () => useContext(NianticARContext);

export const NianticARProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [initializationError, setInitializationError] = useState(null);
  const [phillboards, setPhillboards] = useState([]);
  const [selectedPhillboard, setSelectedPhillboard] = useState(null);
  const [arViewRef, setARViewRef] = useState(null);

  // Initialize AR
  const initializeAR = useCallback((ref) => {
    setARViewRef(ref);
    setIsInitializing(true);
    setInitializationError(null);

    // Initialization will be completed when the AR scene sends the AR_SCENE_READY message
  }, []);

  // Handle AR scene ready
  const handleARSceneReady = useCallback(() => {
    setIsInitialized(true);
    setIsInitializing(false);
  }, []);

  // Handle AR error
  const handleARError = useCallback((error) => {
    setInitializationError(error);
    setIsInitializing(false);
  }, []);

  // Place a phillboard in AR
  const placePhillboard = useCallback((phillboardData) => {
    if (!arViewRef || !isInitialized) return;

    arViewRef.sendMessageToAR({
      action: 'PLACE_PHILLBOARD',
      data: phillboardData,
    });

    setPhillboards((prev) => [...prev, phillboardData]);
  }, [arViewRef, isInitialized]);

  // Update a phillboard in AR
  const updatePhillboard = useCallback((id, updates) => {
    if (!arViewRef || !isInitialized) return;

    arViewRef.sendMessageToAR({
      action: 'UPDATE_PHILLBOARD',
      data: { id, ...updates },
    });

    setPhillboards((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  }, [arViewRef, isInitialized]);

  // Remove a phillboard from AR
  const removePhillboard = useCallback((id) => {
    if (!arViewRef || !isInitialized) return;

    arViewRef.sendMessageToAR({
      action: 'REMOVE_PHILLBOARD',
      data: { id },
    });

    setPhillboards((prev) => prev.filter((p) => p.id !== id));
  }, [arViewRef, isInitialized]);

  // Retry initialization
  const retryInitialization = useCallback(() => {
    setIsInitializing(true);
    setInitializationError(null);
    
    if (arViewRef) {
      // Reload the WebView
      arViewRef.reload();
    }
  }, [arViewRef]);

  const value = {
    isInitialized,
    isInitializing,
    initializationError,
    phillboards,
    selectedPhillboard,
    setSelectedPhillboard,
    initializeAR,
    handleARSceneReady,
    handleARError,
    placePhillboard,
    updatePhillboard,
    removePhillboard,
    retryInitialization,
  };

  return (
    <NianticARContext.Provider value={value}>
      {children}
    </NianticARContext.Provider>
  );
};

export default NianticARContext;
```

## Testing Anchor Placement

To test anchor placement in your demo locations:

1. Create a test component:

```jsx
// screens/TestAnchorPlacementScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNianticAR } from '../context/NianticARContext';
import NianticARView from '../components/NianticARView';
import nianticConfig from '../config/nianticConfig';

const TestAnchorPlacementScreen = () => {
  const {
    isInitialized,
    isInitializing,
    initializationError,
    initializeAR,
    handleARSceneReady,
    handleARError,
    placePhillboard,
  } = useNianticAR();
  
  const [arViewRef, setARViewRef] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  useEffect(() => {
    if (arViewRef) {
      initializeAR(arViewRef);
    }
  }, [arViewRef, initializeAR]);
  
  const handlePlaceTestPhillboard = () => {
    const testPhillboard = {
      id: `test-${Date.now()}`,
      content: 'Test Phillboard',
      // Position will be determined by the AR hit test
    };
    
    placePhillboard(testPhillboard);
  };
  
  const selectLocation = (location) => {
    setSelectedLocation(location);
    // In a real app, you would use the device's GPS to navigate to this location
    // For testing, we're just simulating the selection
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.arContainer}>
        <NianticARView
          ref={setARViewRef}
          onARSceneReady={handleARSceneReady}
          onError={handleARError}
        />
      </View>
      
      {isInitializing && (
        <View style={styles.overlay}>
          <Text>Initializing AR...</Text>
        </View>
      )}
      
      {initializationError && (
        <View style={styles.overlay}>
          <Text>Error: {initializationError.message}</Text>
          <Button title="Retry" onPress={retryInitialization} />
        </View>
      )}
      
      {isInitialized && (
        <View style={styles.controls}>
          <Button
            title="Place Test Phillboard"
            onPress={handlePlaceTestPhillboard}
          />
          
          <Text style={styles.locationsTitle}>Test Locations:</Text>
          {nianticConfig.vpsLocations.map((location) => (
            <Button
              key={location.id}
              title={location.name}
              onPress={() => selectLocation(location)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  arContainer: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
  },
  locationsTitle: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
});

export default TestAnchorPlacementScreen;
```

2. Test the placement in each of your VPS locations
3. Verify that the anchors are stable and correctly positioned
4. Make adjustments to the AR rendering as needed

## Troubleshooting

### Common Issues

1. **Camera Permission Denied**
   - Ensure your app has the proper camera permissions in the manifest/info.plist
   - Request permissions before initializing the AR experience

2. **VPS Location Not Recognized**
   - Ensure you're physically at the VPS location or using a mock location for testing
   - Check that the VPS location has been fully processed
   - Try capturing additional images of the location from different angles

3. **AR Content Floating or Unstable**
   - Ensure sufficient lighting in the environment
   - Make sure the device is properly calibrated
   - Try scanning more of the environment before placing content

4. **WebView Performance Issues**
   - Optimize the Three.js scene with simpler geometries
   - Reduce the number of objects in the scene
   - Use lower resolution textures

### Support Resources

- [Niantic 8th Wall Documentation](https://www.8thwall.com/docs/)
- [Niantic Lightship VPS Documentation](https://lightship.dev/docs/vps/)
- [Three.js Documentation](https://threejs.org/docs/) 