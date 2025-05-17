import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Mock ARView component
export const ARView = ({ children, style, ...props }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    // Simulate initialization process
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <View style={[styles.arView, style]} {...props}>
      {!isInitialized ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Initializing AR Environment...</Text>
        </View>
      ) : (
        <>
          <View style={styles.arBackground}>
            {/* Grid to simulate AR ground plane */}
            <View style={styles.gridContainer}>
              {Array.from({ length: 10 }).map((_, i) => (
                <View key={`h-${i}`} style={[styles.gridLine, styles.gridLineHorizontal, { top: `${10 * i}%` }]} />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <View key={`v-${i}`} style={[styles.gridLine, styles.gridLineVertical, { left: `${10 * i}%` }]} />
              ))}
            </View>
            
            {/* Information overlay */}
            <View style={styles.infoOverlay}>
              <Text style={styles.infoText}>AR Engine: Lightship (Web Simulation)</Text>
              <Text style={styles.statusText}>Status: Running</Text>
            </View>
            
            {/* AR placement guide */}
            <View style={styles.placementGuide}>
              <View style={styles.placementDot} />
              <View style={styles.placementRing} />
            </View>
            
            {/* Add Sample AR anchors */}
            <View style={[styles.arAnchor, { top: '35%', left: '60%' }]}>
              <View style={styles.anchorPoint} />
              <Text style={styles.anchorLabel}>Anchor #1</Text>
            </View>
            
            <View style={[styles.arAnchor, { top: '65%', left: '30%' }]}>
              <View style={styles.anchorPoint} />
              <Text style={styles.anchorLabel}>Anchor #2</Text>
            </View>
          </View>
          
          {/* Pass through any children */}
          {children}
        </>
      )}
    </View>
  );
};

// Mock ARAnchorTrackingComponent
export const ARAnchorTrackingComponent = ({ children, anchorId, alignment, style, onTrackingUpdated, ...props }) => {
  const [trackingState, setTrackingState] = useState('initializing');
  
  useEffect(() => {
    // Simulate tracking state changes
    const timer1 = setTimeout(() => {
      setTrackingState('limited');
      if (onTrackingUpdated) {
        onTrackingUpdated({ state: 'limited', reason: 'initializing' });
      }
    }, 1000);
    
    const timer2 = setTimeout(() => {
      setTrackingState('tracking');
      if (onTrackingUpdated) {
        onTrackingUpdated({ state: 'tracking', reason: null });
      }
    }, 2500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onTrackingUpdated]);
  
  return (
    <View 
      style={[
        styles.anchorTracking,
        trackingState === 'tracking' ? styles.anchorTrackingActive : styles.anchorTrackingLimited,
        style
      ]} 
      {...props}
    >
      <View style={styles.anchorInfo}>
        <Text style={styles.anchorId}>ID: {anchorId || 'unknown'}</Text>
        <Text style={styles.anchorAlignment}>Alignment: {alignment || 'any'}</Text>
        <Text style={styles.trackingStateText}>State: {trackingState}</Text>
      </View>
      {children}
    </View>
  );
};

// Mock additional Lightship exports
export const ARWorldTrackingProvider = ({ children }) => {
  return <>{children}</>;
};

export const ARSemanticsProvider = ({ children }) => {
  return <>{children}</>;
};

export const ARDepthProvider = ({ children }) => {
  return <>{children}</>;
};

export const ARMeshProvider = ({ children }) => {
  return <>{children}</>;
};

// Styles
const styles = StyleSheet.create({
  arView: {
    flex: 1,
    backgroundColor: '#222',
    position: 'relative',
    overflow: 'hidden',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  arBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
  },
  gridContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(100, 200, 255, 0.15)',
  },
  gridLineHorizontal: {
    left: 0,
    right: 0,
    height: 1,
  },
  gridLineVertical: {
    top: 0,
    bottom: 0,
    width: 1,
  },
  infoOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
    padding: 8,
  },
  infoText: {
    color: '#fff',
    fontSize: 12,
  },
  statusText: {
    color: '#4CAF50',
    fontSize: 12,
    marginTop: 4,
  },
  placementGuide: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 80,
    height: 80,
    marginLeft: -40,
    marginTop: -40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placementDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  placementRing: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(76, 175, 80, 0.6)',
    backgroundColor: 'transparent',
  },
  arAnchor: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  anchorPoint: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF9800',
    borderWidth: 2,
    borderColor: '#fff',
  },
  anchorLabel: {
    color: '#fff',
    fontSize: 10,
    marginTop: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  anchorTracking: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
  anchorTrackingLimited: {
    borderColor: '#FFC107',
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
  },
  anchorTrackingActive: {
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  anchorInfo: {
    marginBottom: 8,
  },
  anchorId: {
    color: '#fff',
    fontSize: 12,
  },
  anchorAlignment: {
    color: '#fff',
    fontSize: 12,
  },
  trackingStateText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

// Mock AR Session component
export const ARSessionProvider = ({ children, config, ...props }) => {
  return (
    <View style={{ flex: 1 }}>
      {children}
    </View>
  );
};

// Mock permission hooks
export const usePermissions = () => {
  return {
    hasCameraPermission: true,
    hasLocationPermission: true,
    requestCameraPermission: async () => true,
    requestLocationPermission: async () => true,
  };
};

// Mock tracker
export const useSemanticSegmentationDepthEstimation = () => {
  return {
    isTracking: true,
    data: null,
    error: null,
  };
};

// Mock location tracking
export const useLocationTracking = () => {
  return {
    isTracking: true,
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      altitude: 0,
      accuracy: 1.0,
    },
    error: null,
  };
};

// Mock mesh detection
export const useMesh = () => {
  return {
    isTracking: true,
    meshes: [],
    error: null,
  };
};

// Mock depth tracking
export const useDepth = () => {
  return {
    isTracking: true,
    depth: null,
    error: null,
  };
};

// Mock semantic segmentation
export const useSemanticSegmentation = () => {
  return {
    isTracking: true,
    segments: [],
    error: null,
  };
};

export default {
  ARSessionProvider,
  ARView,
  usePermissions,
  useSemanticSegmentationDepthEstimation,
  useLocationTracking,
  useMesh,
  useDepth,
  useSemanticSegmentation,
}; 